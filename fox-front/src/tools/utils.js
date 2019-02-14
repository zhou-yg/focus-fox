import FileSaver from 'file-saver'

const BLOCK_LIST_KEY = 'blockLocal'
var blockListCache = []

if (typeof localStorage !== 'undefined') {
  blockListCache = localStorage.getItem(BLOCK_LIST_KEY)
  if (blockListCache) {
    blockListCache = blockListCache.split(',')
  } else {
    blockListCache = []
  }
}

export function proxyUrl(src, referer = '') {
  var u = `${window.HOST}/api/proxy?url=${encodeURIComponent(src)}`;
  if (referer) {
    u += `&referer=${encodeURIComponent(referer)}`;
  }
  return u;
}

export function getBlockListCache () {
  return blockListCache
}

export function blobToDownload (blobData, name) {
  return FileSaver.saveAs(blobData, name)
}

export function blockToLocal (srcArr) {
  var arr = localStorage.getItem(BLOCK_LIST_KEY)
  if (arr) {
    arr = arr.split(',')
  } else {
    arr = []
  }
  srcArr = srcArr.concat(arr)

  const s = new Set(srcArr)
  srcArr = [...s]

  localStorage.setItem(BLOCK_LIST_KEY, srcArr)

  blockListCache = srcArr

  return blockListCache
}

export function existInBlock (local, url) {
  if (local) {
    return local.indexOf(url) !== -1
  } else {
    return blockListCache.indexOf(url) !== -1
  }
}

// for cheerio node
export function generateSelectorFromNode (nodeArr, $c) {
  const isArray = Array.isArray(nodeArr)
  nodeArr = [].concat(nodeArr)

  function getSelector (node) {
    const attribs = node.attribs
    if (attribs.id) {
      return `#${attribs.id}`
    } else if (attribs.class) {
      return '.' + String(attribs.class).replace(/ /g, '.')
    } else {
      return node.name
    }
  }

  function find (node, s, nodes = [], count = Infinity) {
    if (node.parent && node.parent.name !== 'body') {
      const parent = node.parent
      const ps = getSelector(parent)

      if (node.parent.parent && s.indexOf('>') === -1) {
        const p2 = parent.parent
        const ps2 = getSelector(p2)
        s = `${ps2} > ${ps} > ${s}`
      } else {
        s = `${ps} > ${s}`
      }

      const $refindArr = $c(s)

      if ($refindArr.length > 1 && count > 0) {
        if (nodes.length > 0) {
          const refindArr = [].slice.call($refindArr)
          const isAllSameSelectorNode = nodes.every(node => {
            // return _.findIndex(refindArr, {src: node.attribs.src}) !== -1
            return refindArr.indexOf(node) !== -1
          })

          if (isAllSameSelectorNode) {
            return s
          } else {
            return find(parent, s, nodes, count - 1)
          }
        } else {
          return find(parent, s, nodes, count - 1)
        }
      } else {
        return s
      }
    }
    return s
  }
  var r = nodeArr.map(node => {
    const initialSelector = getSelector(node)

    return find(node, initialSelector)
  })

  if (isArray) {
    const selectorNodesMap = {}

    r.forEach((s, i) => {
      if (!selectorNodesMap[s]) {
        selectorNodesMap[s] = {
          name: s,
          nodes: [],
        }
      }
      selectorNodesMap[s].nodes.push(nodeArr[i])
    })
    r = r.map((s, i) => {
      if (selectorNodesMap[s].nodes.length > 0) {
        const node = nodeArr[i]
        const initialSelector = getSelector(node)

        let newS = find(node, initialSelector, selectorNodesMap[s].nodes)
        return newS
      } else {
        return s
      }
    })
  }

  if (isArray) {
    return r
  } else {
    return r[0]
  }
}
export function createNextUrl (curUrl, nextUrl) {
  var curUrlReverse = curUrl.split('').reverse().join('')
  var nextUrlReverse = nextUrl.split('').reverse().join('')
  var longLen = curUrl.length > nextUrl.length ? curUrl.length : nextUrl.length

  var i = 0
  var startIndex = 0
  var nextStartIndex = 0
  var curEndInex = 0
  var nextEndIndex = 0
  var findEnd = false

  // while (i < longLen) {
  //   let c1 = curUrl[i]
  //   let c2 = nextUrl[i]
  //   if (c1 !== c2) {
  //     startIndex = i
  //     break
  //   }
  //   i++
  // }
  // i = 0

  while (i < longLen) {
    let c1 = curUrlReverse[i]
    let c2 = nextUrlReverse[i]
    // console.log(c1, c2)
    if (c1 !== c2 && /\d/.test(c1) && !findEnd) {
      findEnd = true
      curEndInex = curUrl.length - i
      nextEndIndex = nextUrl.length - i
    } else if (findEnd) {
      if (!/\d/.test(c1)) {
        startIndex = curUrl.length - i
      }
      if (!/\d/.test(c2)) {
        nextStartIndex = nextUrl.length - i
      }
      if (startIndex && nextStartIndex) {
        break
      }
    }
    i++
  }

  var d1Char = curUrl.substring(startIndex, curEndInex)
  var d2Char = nextUrl.substring(nextStartIndex, nextEndIndex)
  var d1, d2

  if (!d1Char && /\d*/.test(d2Char)) {
    d1 = d2.replace(/[\d]+/, '1')
    d1 = d1.replace(/[^\d]*/g, '')
    d2 = d2.replace(/[^\d]*/g, '')
  } else if (String(d1Char).length > String(d2Char).length) {
    d1 = 1
    d2 = d2Char
  } else {
    d1 = d1Char
    d2 = d2Char
  }
  console.log(d1, d2, d1Char, d2Char)
  console.log(startIndex, nextStartIndex, curEndInex, nextEndIndex)

  const isCanUseMulti = d1 && d2 && !isNaN(Number(d1)) && !isNaN(Number(d2))
  const isNumGap = isCanUseMulti ? Number(d2) - Number(d1) : 0
  var countIndex = 0
  return function (gotoNext) {
    if (isCanUseMulti) {
      countIndex++
      const curIndex = Number(d2) + countIndex * isNumGap
      const newIndex = d2.replace(/[\d]+/, curIndex)
      return nextUrl.substring(0, nextStartIndex) + newIndex + nextUrl.substring(nextEndIndex)
    }
  }
}
// const fn = createNextUrl('http://www.mmonly.cc/mmtp/swmn/160441.html', 'http://www.mmonly.cc/mmtp/swmn/160441_2.html')
// console.log(fn())
