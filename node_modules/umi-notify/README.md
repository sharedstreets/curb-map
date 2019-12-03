# umi-notify

Notification package for all tools we maintained.

---

## Usage

```js
import notify from 'umi-notify';

notify.onDevStart({ name, version });
notify.onDevComplete({ name, version });
notify.onBuildStart({ name, version });
notify.onBuildComplete({ name, version });
```

## LICENSE

MIT
