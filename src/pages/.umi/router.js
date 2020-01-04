import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/lib/renderRoutes';
import history from '@tmp/history';
import RendererWrapper0 from '/Users/eros/github/curb-map/src/pages/.umi/LocaleWrapper.jsx';
import { routerRedux } from 'dva';

const Router = routerRedux.ConnectedRouter;

const routes = [
  {
    path: '/',
    component: require('../../layouts/index.tsx').default,
    routes: [
      {
        path: '/index.html',
        exact: true,
        component: require('../index.tsx').default,
        _title: 'CurbLR Viewer',
        _title_default: 'CurbLR Viewer',
      },
      {
        path: '/',
        exact: true,
        component: require('../index.tsx').default,
        _title: 'CurbLR Viewer',
        _title_default: 'CurbLR Viewer',
      },
      {
        component: () =>
          React.createElement(
            require('/Users/eros/github/curb-map/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
              .default,
            { pagesPath: 'src/pages', hasRoutesInConfig: false },
          ),
        _title: 'CurbLR Viewer',
        _title_default: 'CurbLR Viewer',
      },
    ],
    _title: 'CurbLR Viewer',
    _title_default: 'CurbLR Viewer',
  },
  {
    component: () =>
      React.createElement(
        require('/Users/eros/github/curb-map/node_modules/umi-build-dev/lib/plugins/404/NotFound.js')
          .default,
        { pagesPath: 'src/pages', hasRoutesInConfig: false },
      ),
    _title: 'CurbLR Viewer',
    _title_default: 'CurbLR Viewer',
  },
];
window.g_routes = routes;
const plugins = require('umi/_runtimePlugin');
plugins.applyForEach('patchRoutes', { initialValue: routes });

export { routes };

export default class RouterWrapper extends React.Component {
  unListen() {}

  constructor(props) {
    super(props);

    // route change handler
    function routeChangeHandler(location, action) {
      plugins.applyForEach('onRouteChange', {
        initialValue: {
          routes,
          location,
          action,
        },
      });
    }
    this.unListen = history.listen(routeChangeHandler);
    // dva 中 history.listen 会初始执行一次
    // 这里排除掉 dva 的场景，可以避免 onRouteChange 在启用 dva 后的初始加载时被多执行一次
    const isDva =
      history.listen
        .toString()
        .indexOf('callback(history.location, history.action)') > -1;
    if (!isDva) {
      routeChangeHandler(history.location);
    }
  }

  componentWillUnmount() {
    this.unListen();
  }

  render() {
    const props = this.props || {};
    return (
      <RendererWrapper0>
        <Router history={history}>{renderRoutes(routes, props)}</Router>
      </RendererWrapper0>
    );
  }
}
