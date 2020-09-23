import 'jest';
import { filterCurblrData, CurbFeatureCollection, TimesOfDay } from '../curblr';
import React from 'react';
import renderer, { ReactTestInstance, ReactTestRenderer } from 'react-test-renderer';

jest.mock('umi-plugin-locale');

describe('common: curblr filterCurblrData', () => {
  it('single rule goes thrue', () => {
    // 5  |S    E|
    const curblrSingleRule: CurbFeatureCollection = { "type": "FeatureCollection", 
      "features": [{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 72, 
            "shstLocationEnd": 356 
          }, 
          "regulations": [{ 
            "priority": 5, 
            "rule": { 
              "activity": "parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      }] 
    };

    const filteredCurblr: CurbFeatureCollection = filterCurblrData(curblrSingleRule, "mo", "08:00");
    expect(filteredCurblr.features).toHaveLength(1);
    expect(filteredCurblr.features[0].properties.regulations[0].rule.activity).toBe("parking");
    expect(filteredCurblr.features[0].properties.regulations[0].priority).toBe(5);
    expect(filteredCurblr.features[0].properties.location.shstLocationStart).toBe(72);
    expect(filteredCurblr.features[0].properties.location.shstLocationEnd).toBe(356);
  });


  it('dual independant rules goes thrue', () => {
    // 5  |S    E|
    // 4            |S   E|
    const curblrSingleRule: CurbFeatureCollection = { "type": "FeatureCollection", 
      "features": [{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 72, 
            "shstLocationEnd": 154 
          }, 
          "regulations": [{ 
            "priority": 5, 
            "rule": { 
              "activity": "parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      },{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 181, 
            "shstLocationEnd": 356 
          }, 
          "regulations": [{ 
            "priority": 4, 
            "rule": { 
              "activity": "no parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      }] 
    };

    const filteredCurblr: CurbFeatureCollection = filterCurblrData(curblrSingleRule, "mo", "08:00");
    expect(filteredCurblr.features).toHaveLength(2);
    let firstFeature = filteredCurblr.features.find(ft=>ft.properties.regulations[0].priority==5)
    expect(firstFeature).toBeDefined();
    if(firstFeature){
      expect(firstFeature.properties.regulations[0].rule.activity).toBe("parking");
      expect(firstFeature.properties.location.shstLocationStart).toBe(72);
      expect(firstFeature.properties.location.shstLocationEnd).toBe(154);
    }
    let secondFeature = filteredCurblr.features.find(ft=>ft.properties.regulations[0].priority==4)
    expect(secondFeature).toBeDefined();
    if(secondFeature){
      expect(secondFeature.properties.regulations[0].rule.activity).toBe("no parking");
      expect(secondFeature.properties.location.shstLocationStart).toBe(181);
      expect(secondFeature.properties.location.shstLocationEnd).toBe(356);
    }
  });

  it('dual independant rules goes thrue inverse', () => {
    // 4  |S    E|
    // 5            |S   E|
    const curblrSingleRule: CurbFeatureCollection = { "type": "FeatureCollection", 
      "features": [{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 72, 
            "shstLocationEnd": 154 
          }, 
          "regulations": [{ 
            "priority": 4, 
            "rule": { 
              "activity": "parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      },{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 181, 
            "shstLocationEnd": 356 
          }, 
          "regulations": [{ 
            "priority": 5, 
            "rule": { 
              "activity": "no parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      }] 
    };

    const filteredCurblr: CurbFeatureCollection = filterCurblrData(curblrSingleRule, "mo", "08:00");
    expect(filteredCurblr.features).toHaveLength(2);
    let firstFeature = filteredCurblr.features.find(ft=>ft.properties.regulations[0].priority==4)
    expect(firstFeature).toBeDefined();
    if(firstFeature){
      expect(firstFeature.properties.regulations[0].rule.activity).toBe("parking");
      expect(firstFeature.properties.location.shstLocationStart).toBe(72);
      expect(firstFeature.properties.location.shstLocationEnd).toBe(154);
    }
    let secondFeature = filteredCurblr.features.find(ft=>ft.properties.regulations[0].priority==5)
    expect(secondFeature).toBeDefined();
    if(secondFeature){
      expect(secondFeature.properties.regulations[0].rule.activity).toBe("no parking");
      expect(secondFeature.properties.location.shstLocationStart).toBe(181);
      expect(secondFeature.properties.location.shstLocationEnd).toBe(356);
    }
  });


  it('full overlap rules', () => {
    // 5   |S    E|
    // 4 |S              E|
    const curblrSingleRule: CurbFeatureCollection = { "type": "FeatureCollection", 
      "features": [{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 124, 
            "shstLocationEnd": 181 
          }, 
          "regulations": [{ 
            "priority": 5, 
            "rule": { 
              "activity": "parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      },{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 72, 
            "shstLocationEnd": 356 
          }, 
          "regulations": [{ 
            "priority": 4, 
            "rule": { 
              "activity": "no parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      }] 
    };

    const filteredCurblr: CurbFeatureCollection = filterCurblrData(curblrSingleRule, "mo", "08:00");
    expect(filteredCurblr.features).toHaveLength(1);
    expect(filteredCurblr.features[0].properties.regulations[0].rule.activity).toBe("no parking");
    expect(filteredCurblr.features[0].properties.regulations[0].priority).toBe(4);
    expect(filteredCurblr.features[0].properties.location.shstLocationStart).toBe(72);
    expect(filteredCurblr.features[0].properties.location.shstLocationEnd).toBe(356);
  });


  it('overlap split rules', () => {
    // 4   |S    E|
    // 5 |S              E|
    const curblrSingleRule: CurbFeatureCollection = { "type": "FeatureCollection", 
      "features": [{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 124, 
            "shstLocationEnd": 181 
          }, 
          "regulations": [{ 
            "priority": 4, 
            "rule": { 
              "activity": "no parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      },{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 72, 
            "shstLocationEnd": 356 
          }, 
          "regulations": [{ 
            "priority": 5, 
            "rule": { 
              "activity": "parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      }] 
    };

    const filteredCurblr: CurbFeatureCollection = filterCurblrData(curblrSingleRule, "mo", "08:00");
    expect(filteredCurblr.features).toHaveLength(3);
    let firstFeature = filteredCurblr.features.find(ft=>ft.properties.location.shstLocationStart==72)
    expect(firstFeature).toBeDefined();
    if(firstFeature){
      expect(firstFeature.properties.regulations[0].rule.activity).toBe("parking");
      expect(firstFeature.properties.regulations[0].priority).toBe(5);
      expect(firstFeature.properties.location.shstLocationStart).toBe(72);
      expect(firstFeature.properties.location.shstLocationEnd).toBe(124);
    }
    let secondFeature = filteredCurblr.features.find(ft=>ft.properties.location.shstLocationStart==124)
    expect(secondFeature).toBeDefined();
    if(secondFeature){
      expect(secondFeature.properties.regulations[0].rule.activity).toBe("no parking");
      expect(secondFeature.properties.regulations[0].priority).toBe(4);
      expect(secondFeature.properties.location.shstLocationStart).toBe(124);
      expect(secondFeature.properties.location.shstLocationEnd).toBe(181);
    }
    let thirdFeature = filteredCurblr.features.find(ft=>ft.properties.location.shstLocationStart==181)
    expect(thirdFeature).toBeDefined();
    if(thirdFeature){
      expect(thirdFeature.properties.regulations[0].rule.activity).toBe("parking");
      expect(thirdFeature.properties.regulations[0].priority).toBe(5);
      expect(thirdFeature.properties.location.shstLocationStart).toBe(181);
      expect(thirdFeature.properties.location.shstLocationEnd).toBe(356);
    }
  });


  it('partial overlap rigth rules', () => {
    // 4   |S    E|
    // 5      |S     E|
    const curblrSingleRule: CurbFeatureCollection = { "type": "FeatureCollection", 
      "features": [{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 72, 
            "shstLocationEnd": 181 
          }, 
          "regulations": [{ 
            "priority": 4, 
            "rule": { 
              "activity": "no parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      },{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 124, 
            "shstLocationEnd": 356 
          }, 
          "regulations": [{ 
            "priority": 5, 
            "rule": { 
              "activity": "parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      }] 
    };

    const filteredCurblr: CurbFeatureCollection = filterCurblrData(curblrSingleRule, "mo", "08:00");
    expect(filteredCurblr.features).toHaveLength(2);
    let firstFeature = filteredCurblr.features.find(ft=>ft.properties.location.shstLocationStart==72)
    expect(firstFeature).toBeDefined();
    if(firstFeature){
      expect(firstFeature.properties.regulations[0].rule.activity).toBe("no parking");
      expect(firstFeature.properties.regulations[0].priority).toBe(4);
      expect(firstFeature.properties.location.shstLocationStart).toBe(72);
      expect(firstFeature.properties.location.shstLocationEnd).toBe(181);
    }
    let secondFeature = filteredCurblr.features.find(ft=>ft.properties.location.shstLocationStart==181)
    expect(secondFeature).toBeDefined();
    if(secondFeature){
      expect(secondFeature.properties.regulations[0].rule.activity).toBe("parking");
      expect(secondFeature.properties.regulations[0].priority).toBe(5);
      expect(secondFeature.properties.location.shstLocationStart).toBe(181);
      expect(secondFeature.properties.location.shstLocationEnd).toBe(356);
    }
  });


  it('partial overlap left rules', () => {
    // 4      |S    E|
    // 5   |S     E|
    const curblrSingleRule: CurbFeatureCollection = { "type": "FeatureCollection", 
      "features": [{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 124, 
            "shstLocationEnd": 356 
          }, 
          "regulations": [{ 
            "priority": 4, 
            "rule": { 
              "activity": "no parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      },{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 72, 
            "shstLocationEnd": 181 
          }, 
          "regulations": [{ 
            "priority": 5, 
            "rule": { 
              "activity": "parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      }] 
    };

    const filteredCurblr: CurbFeatureCollection = filterCurblrData(curblrSingleRule, "mo", "08:00");
    expect(filteredCurblr.features).toHaveLength(2);
    let firstFeature = filteredCurblr.features.find(ft=>ft.properties.location.shstLocationStart==124)
    expect(firstFeature).toBeDefined();
    if(firstFeature){
      expect(firstFeature.properties.regulations[0].rule.activity).toBe("no parking");
      expect(firstFeature.properties.regulations[0].priority).toBe(4);
      expect(firstFeature.properties.location.shstLocationStart).toBe(124);
      expect(firstFeature.properties.location.shstLocationEnd).toBe(356);
    }
    let secondFeature = filteredCurblr.features.find(ft=>ft.properties.location.shstLocationStart==72)
    expect(secondFeature).toBeDefined();
    if(secondFeature){
      expect(secondFeature.properties.regulations[0].rule.activity).toBe("parking");
      expect(secondFeature.properties.regulations[0].priority).toBe(5);
      expect(secondFeature.properties.location.shstLocationStart).toBe(72);
      expect(secondFeature.properties.location.shstLocationEnd).toBe(124);
    }
  });


  it('default value on rules not applyed', () => {
    const curblrSingleRule: CurbFeatureCollection = { "type": "FeatureCollection", 
      "features": [{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 72, 
            "shstLocationEnd": 356 
          }, 
          "regulations": [{ 
            "priority": 5, 
            "rule": { 
              "activity": "no parking" 
            },
            timeSpans: [{
              daysOfWeek: {days:["sa"]}
            }]
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      }] 
    };

    const filteredCurblr: CurbFeatureCollection = filterCurblrData(curblrSingleRule, "mo", "08:00");
    expect(filteredCurblr.features).toHaveLength(1);
    expect(filteredCurblr.features[0].properties.regulations[0].rule.activity).toBe("parking");
    expect(filteredCurblr.features[0].properties.regulations[0].priority).toBe(10);
    expect(filteredCurblr.features[0].properties.location.shstLocationStart).toBe(72);
    expect(filteredCurblr.features[0].properties.location.shstLocationEnd).toBe(356);
  });


  it('original colection unchanged', () => {
    // 4      |S    E|
    // 5   |S     E|
    const curblrSingleRule: CurbFeatureCollection = { "type": "FeatureCollection", 
      "features": [{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 124, 
            "shstLocationEnd": 356 
          }, 
          "regulations": [{ 
            "priority": 4, 
            "rule": { 
              "activity": "no parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      },{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 72, 
            "shstLocationEnd": 181 
          }, 
          "regulations": [{ 
            "priority": 5, 
            "rule": { 
              "activity": "parking" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      }] 
    };

    const filteredCurblr: CurbFeatureCollection = filterCurblrData(curblrSingleRule, "mo", "08:00");
    expect(curblrSingleRule.features).toHaveLength(2);
    let firstFeature = curblrSingleRule.features.find(ft=>ft.properties.location.shstLocationStart==124)
    expect(firstFeature).toBeDefined();
    if(firstFeature){
      expect(firstFeature.properties.regulations[0].rule.activity).toBe("no parking");
      expect(firstFeature.properties.regulations[0].priority).toBe(4);
      expect(firstFeature.properties.location.shstLocationStart).toBe(124);
      expect(firstFeature.properties.location.shstLocationEnd).toBe(356);
    }
    let secondFeature = curblrSingleRule.features.find(ft=>ft.properties.location.shstLocationStart==72)
    expect(secondFeature).toBeDefined();
    if(secondFeature){
      expect(secondFeature.properties.regulations[0].rule.activity).toBe("parking");
      expect(secondFeature.properties.regulations[0].priority).toBe(5);
      expect(secondFeature.properties.location.shstLocationStart).toBe(72);
      expect(secondFeature.properties.location.shstLocationEnd).toBe(181);
    }
  });
  

  it('default value applyed outside timespan', () => {
    const curblrSingleRule: CurbFeatureCollection = { 
      "type": "FeatureCollection", 
      "features": [{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 124, 
            "shstLocationEnd": 356 
          }, 
          "regulations": [{ 
            "priority": 4, 
            "rule": { 
              "activity": "no parking"
            },
            "timeSpans": [
              {
                "daysOfWeek": {
                  "days": ["mo", "tu", "we", "th", "fr"]
                },
                "timesOfDay": [
                  {"from": "09:00", "to": "15:00"}
                ]
              }
            ]
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      }] 
    };

    const filteredCurblr: CurbFeatureCollection = filterCurblrData(curblrSingleRule, "mo", "08:00");
    expect(filteredCurblr.features).toHaveLength(1);
    expect(filteredCurblr.features[0].properties.regulations[0].rule.activity).toBe("parking");
    expect(filteredCurblr.features[0].properties.regulations[0].priority).toBe(10);
    expect(filteredCurblr.features[0].properties.location.shstLocationStart).toBe(124);
    expect(filteredCurblr.features[0].properties.location.shstLocationEnd).toBe(356);
  });


  it('partial overlap rigth rules with timespan', () => {
    // 4   |S    E|
    // 5      |S     E|
    const curblrSingleRule: CurbFeatureCollection = { "type": "FeatureCollection", 
      "features": [{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 72, 
            "shstLocationEnd": 181 
          }, 
          "regulations": [{ 
            "priority": 4, 
            "rule": { 
              "activity": "no parking" 
            },
            "timeSpans": [
              {
                "daysOfWeek": {
                  "days": ["mo", "tu", "we", "th", "fr"]
                },
                "timesOfDay": [
                  {"from": "09:00", "to": "15:00"}
                ]
              }
            ]
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      },{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 124, 
            "shstLocationEnd": 356 
          }, 
          "regulations": [{ 
            "priority": 5, 
            "rule": { 
              "activity": "no stopping" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      }] 
    };

    const filteredCurblr: CurbFeatureCollection = filterCurblrData(curblrSingleRule, "mo", "08:00");
    expect(filteredCurblr.features).toHaveLength(2);
    let firstFeature = filteredCurblr.features.find(ft=>ft.properties.location.shstLocationStart==72)
    expect(firstFeature).toBeDefined();
    if(firstFeature){
      expect(firstFeature.properties.regulations[0].rule.activity).toBe("parking");
      expect(firstFeature.properties.regulations[0].priority).toBe(10);
      expect(firstFeature.properties.location.shstLocationStart).toBe(72);
      expect(firstFeature.properties.location.shstLocationEnd).toBe(124);
    }
    let secondFeature = filteredCurblr.features.find(ft=>ft.properties.location.shstLocationStart==124)
    expect(secondFeature).toBeDefined();
    if(secondFeature){
      expect(secondFeature.properties.regulations[0].rule.activity).toBe("no stopping");
      expect(secondFeature.properties.regulations[0].priority).toBe(5);
      expect(secondFeature.properties.location.shstLocationStart).toBe(124);
      expect(secondFeature.properties.location.shstLocationEnd).toBe(356);
    }
  });


  it('overlap split rules with timespans', () => {
    // 4   |S    E|
    // 5 |S              E|
    const curblrSingleRule: CurbFeatureCollection = { "type": "FeatureCollection", 
      "features": [{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 5, 
            "shstLocationEnd": 160 
          }, 
          "regulations": [{ 
            "priority": 4, 
            "rule": { 
              "activity": "no parking" 
            },
            "timeSpans": [
              {
                "daysOfWeek": {
                  "days": ["mo", "tu", "we", "th", "fr"]
                },
                "timesOfDay": [
                  {"from": "09:00", "to": "15:00"}
                ]
              }
            ]
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      },{ 
        "type": "Feature", 
        "properties": { 
          "location": { 
            "shstRefId": "36229e5a535b71a9f0b19e1bf51c21be", 
            "sideOfStreet": "right", 
            "shstLocationStart": 27, 
            "shstLocationEnd": 73 
          }, 
          "regulations": [{ 
            "priority": 5, 
            "rule": { 
              "activity": "no stopping" 
            }
          }]
        },
        "geometry": { 
          "type": "LineString", 
          "coordinates": [] // not used in this test
        } 
      }] 
    };

    const filteredCurblr: CurbFeatureCollection = filterCurblrData(curblrSingleRule, "mo", "08:00");
    expect(filteredCurblr.features).toHaveLength(3);
    let firstFeature = filteredCurblr.features.find(ft=>ft.properties.location.shstLocationStart==5)
    expect(firstFeature).toBeDefined();
    if(firstFeature){
      expect(firstFeature.properties.regulations[0].rule.activity).toBe("parking");
      expect(firstFeature.properties.regulations[0].priority).toBe(10);
      expect(firstFeature.properties.location.shstLocationStart).toBe(5);
      expect(firstFeature.properties.location.shstLocationEnd).toBe(27);
    }
    let secondFeature = filteredCurblr.features.find(ft=>ft.properties.location.shstLocationStart==73)
    expect(secondFeature).toBeDefined();
    if(secondFeature){
      expect(secondFeature.properties.regulations[0].rule.activity).toBe("parking");
      expect(secondFeature.properties.regulations[0].priority).toBe(10);
      expect(secondFeature.properties.location.shstLocationStart).toBe(73);
      expect(secondFeature.properties.location.shstLocationEnd).toBe(160);
    }
    let thirdFeature = filteredCurblr.features.find(ft=>ft.properties.location.shstLocationStart==27)
    expect(thirdFeature).toBeDefined();
    if(thirdFeature){
      expect(thirdFeature.properties.regulations[0].rule.activity).toBe("no stopping");
      expect(thirdFeature.properties.regulations[0].priority).toBe(5);
      expect(thirdFeature.properties.location.shstLocationStart).toBe(27);
      expect(thirdFeature.properties.location.shstLocationEnd).toBe(73);
    }
  });

});
