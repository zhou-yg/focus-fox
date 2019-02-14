const plugin = require('plugin');

const NAME = 'v2ex';

function genMySteps () {

  const steps = [
    plugin.generateOption({
      name: '站名',
      type: 'text',
    }),
    plugin.generateOption({
      name: 'tab',
      type: 'select',
      options: ['jobs'],
    }),
    plugin.generateOption({
      name: 't帖子',
      type: 'request to get select',
      options: ['...'],
    }),
  ]
}

plugin.on('search', (r) => {
  let {website, parsedUrl} = r;
  if (website === NAME) {
    if (parsedUrl) {

    }
  }
});
