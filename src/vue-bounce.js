/**
 * @author ziPeiJun <zipeijun@gmail.com>
 * @license MIT
 */

class vueBounce {

    constructor () {
        this._startPoint = null
        this._handleStart = null
        this._handleMove = null
        this._handleEnd = null
    }

    install (Vue, { name } = {}) {

        const directiveName = name || 'bounce'

        const directive = (el, binding) => {

            if (this._handleStart === null || this._handleMove === null || this._handleEnd === null) {
                this._handleStart = this._touchstartEvent.bind(this, this)
                this._handleMove = this._touchmoveEvent.bind(this, this, el)
                this._handleEnd = this._touchendEvent.bind(this, this)
            }

            if (binding.value) { // 缺省和 false 禁用 bounce 效果、true 启用

                el.removeEventListener('touchstart', this._handleStart)

                window.removeEventListener('touchmove', this._handleMove)

                window.removeEventListener('touchend', this._handleEnd)

                return void 0
            }

            el.addEventListener('touchstart', this._handleStart)

            window.addEventListener('touchmove', this._handleMove, {
                passive: false
            })

            window.addEventListener('touchend', this._handleEnd)

        }

        Vue.directive(directiveName, directive.bind(this))

    }

    _getScrollTop (el) { // 获取滚动高度
        return el.scrollTop
    }

    _getScrollHeight (el) { // 滚动内容的高度
        return el.scrollHeight
    }

    _getClientHeight (el) { // 滚动容器的高度
        return el.clientHeight
    }

    _getPoint (e) { // 获取手指位置
        return {
            x: e.touches ? e.touches[0].pageX : e.clientX,
            y: e.touches ? e.touches[0].pageY : e.clientY
        }
    }

    _preventDefault (e) { // 在可以阻止的时候阻止滚动行为
        if (e.cancelable) e.preventDefault()
    }

    _touchstartEvent (context, e) {
        context._startPoint = context._getPoint(e)
    }

    _touchmoveEvent (context, el, e) {
        if (!context._startPoint) return void 0

        const curPoint = context._getPoint(e) // 当前点
        const moveY = curPoint.y - context._startPoint.y // 和起点比,移动的距离,大于0向下拉,小于0向上拉
        const scrollTop = context._getScrollTop(el) // 当前滚动条的距离

        if (moveY > 0 && scrollTop <= 0) { // 如果在顶部,则阻止浏览器默认事件
            context._preventDefault(e)
            return void 0
        }

        const scrollHeight = context._getScrollHeight(el) // 滚动内容的高度
        const clientHeight = context._getClientHeight(el) // 滚动容器的高度
        const toBottom = scrollHeight - clientHeight - scrollTop // 滚动条距离底部的距离

        if (moveY < 0 && toBottom <= 0) context._preventDefault(e) // 如果在底部,则阻止浏览器默认事件
    }

    _touchendEvent (context, e) {
        context._startPoint = null
    }

}

export default new vueBounce
