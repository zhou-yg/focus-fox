import Vuex from 'vuex'
import Vue from 'vue'
import * as utils from '../tools/utils'

const BLOCK_UPDATE = 'BLOCK_UPDATE'

Vue.use(Vuex)

export default function createStore () {
  const store = new Vuex.Store({
    state: {
      blockListLocal: utils.getBlockListCache(),
    },
    mutations: {
      [BLOCK_UPDATE] (state, {srcArr}) {
        state.blockListLocal = utils.blockToLocal(srcArr)
      },
    },
    actions: {
      addBlock (store, srcArr) {
        store.commit({
          type: BLOCK_UPDATE,
          srcArr,
        })
      },
    },
    modules: {
    },
  })
  return store
}
