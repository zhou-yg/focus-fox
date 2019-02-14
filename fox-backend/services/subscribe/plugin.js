const EventEmitter = require('events');

//
class Option {
  constructor ({name, type, options, value}) {
    this.name = name;
    // text, select, radio, checkbox
    this.type = type;
    // { value, label, }
    this.options = (options || []).map(v => {
      if (typeof v === 'string') {
        return {
          value: v,
          label: v,
        };
      }
      return v;
    });
    this.value = value;

    if (!this.type) {
      console.log('muse be have type');
    }
    if (['select', 'radio', 'checkbox'].includes(this.type) && this.options.some(obj => obj.value === undefined || obj.label === undefined)) {
      console.log('muse be have value and label');
    }
  }
}
/*
event name: search,
*/

class Plugin extends EventEmitter {
  constructor () {
    super();
  }

  search (r) {
    this.emit('search', {
      website: r.website,
      parsedUrl: r.parsedUrl,
    })
  }

  generateOption (obj) {
    return new Option(obj);
  }
}


const p = new Plugin();

module.exports = p;
