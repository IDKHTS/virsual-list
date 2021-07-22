// class VirsualList {
//     constructor(options) {
//         this.el = options.el || null
//         this.dataSource = options.dataSource || []
//         this.itemHeight = options.ItemHeight || 64
//         this.visiableCount = options.visiableCount || 10
//         this.creatItem = options.creatItem || function () {}

//         this.startIdx = 0
//         this.render = this._render.bind(this)
//         this.handleScroll = this._handleScroll.bind(this)

//         this.longListELOffset = this.el.getBoundingClientRect().top

//         this.render()
//     }

//     _render() {
//         const visiableCount = this.visiableCount
//         const dataSource = this.dataSource

//         const endIdx =
//             this.startIdx + visiableCount < dataSource.length
//                 ? this.startIdx + visiableCount
//                 : dataSource.length - 1

//         let fragment = document.createDocumentFragment()
//         for (let i = this.startIdx; i <= endIdx; i++) {
//             const tmpEl = this.creatItem(dataSource[i])
//             tmpEl && fragment.appendChild(tmpEl)
//         }

//         this.el.innerHTML = ''
//         this.el.style.paddingTop = `${this.startIdx * this.itemHeight}px`
//         const lessCount = longArr.length - endIdx
//         this.el.style.paddingBottom = `${
//             (lessCount < 1 ? 0 : lessCount) * this.itemHeight
//         }px`
//         this.el.appendChild(fragment)
//     }

//     // 处理滚动时触发的事件
//     _handleScroll(e) {
//         // 兼容 iOS Safari/Webview
//         const doc = window.document.body.scrollTop
//             ? window.document.body
//             : window.document.documentElement

//         const scrollTop = doc.scrollTop
//         const dataOffset =
//             scrollTop - this.longListELOffset > 0
//                 ? scrollTop - this.longListELOffset
//                 : 0
//         this.startIdx = Math.floor(dataOffset / this.itemHeight)

//         this.render()
//     }
// }

// 优化
class VirsualList {
    constructor(options) {
        this.el = options.el || null
        this.dataSource = options.dataSource || []
        this.itemHeight = options.ItemHeight || 64
        this.visiableCount = options.visiableCount || 10
        this.creatItem = options.creatItem || function () {}

        this.startIdx = 0
        this.container = document.createElement('div')
        this.container.style.position = 'absolute'
        this.container.style.width = '100%'
        this.el.appendChild(this.container)
        this.el.style.paddingTop = `${
            this.dataSource.length * this.itemHeight
        }px`

        this.render = this._render.bind(this)
        this.handleScroll = this._handleScroll.bind(this)

        this.longListELOffset = this.el.getBoundingClientRect().top

        this.render()
    }


    // 优化，脱离文档流
    _render() {
        const visiableCount = this.visiableCount
        const dataSource = this.dataSource

        const endIdx =
            this.startIdx + visiableCount < dataSource.length
                ? this.startIdx + visiableCount
                : dataSource.length - 1

        let fragment = document.createDocumentFragment()
        
        for (let i = this.startIdx; i <= endIdx; i++) {
            const tmpEl = this.creatItem(dataSource[i])
            tmpEl && fragment.appendChild(tmpEl)
        }

        this.container.innerHTML = ''
        this.container.style.top = `${this.startIdx * this.itemHeight}px`
        this.container.appendChild(fragment)
    }

    // 处理滚动时触发的事件
    _handleScroll(e) {
        // 兼容 iOS Safari/Webview
        const doc = window.document.body.scrollTop
            ? window.document.body
            : window.document.documentElement

        const scrollTop = doc.scrollTop
        const dataOffset =
            scrollTop - this.longListELOffset > 0
                ? scrollTop - this.longListELOffset
                : 0
        this.startIdx = Math.floor(dataOffset / this.itemHeight)

        this.render()
    }
}
