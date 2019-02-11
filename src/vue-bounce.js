/**
 * @author ziPeiJun <zipeijun@gmail.com>
 * @license MIT
 */

const vueBounce = {}

vueBounce.install = (Vue, { name } = {}) => {

    const directiveName = name || 'bounce'

    Vue.directive(directiveName, {

        bind (el, binding) {

            if (binding.value) return void 0 // 缺省和 false 禁用 bounce 效果、true 启用

            let startPoint

            const getScrollTop = () => el.scrollTop // 获取滚动高度

            const getScrollHeight = () => el.scrollHeight // 滚动内容的高度

            const getClientHeight = () => el.clientHeight // 滚动容器的高度

            const getPoint = e => { // 获取手指位置
                return {
                    x: e.touches ? e.touches[0].pageX : e.clientX,
                    y: e.touches ? e.touches[0].pageY : e.clientY
                }
            }

            const preventDefault = e => { // 在可以阻止的时候阻止滚动行为
                if (e.cancelable) e.preventDefault()
            }

            const touchstartEvent = e => startPoint = getPoint(e)

            const touchmoveEvent = e => {
                if (!startPoint) return void 0

                const curPoint = getPoint(e) // 当前点
                const moveY = curPoint.y - startPoint.y // 和起点比,移动的距离,大于0向下拉,小于0向上拉
                const scrollTop = getScrollTop() // 当前滚动条的距离

                if (moveY > 0 && scrollTop <= 0) { // 如果在顶部,则阻止浏览器默认事件
                    preventDefault(e)
                    return void 0
                }

                const scrollHeight = getScrollHeight() // 滚动内容的高度
                const clientHeight = getClientHeight() // 滚动容器的高度
                const toBottom = scrollHeight - clientHeight - scrollTop // 滚动条距离底部的距离

                if (moveY < 0 && toBottom <= 0) preventDefault(e) // 如果在底部,则阻止浏览器默认事件
            }

            const touchendEvent = e => startPoint = void 0

            el.addEventListener('touchstart', touchstartEvent)

            window.addEventListener('touchmove', touchmoveEvent, {
                passive: false
            })

            window.addEventListener('touchend', touchendEvent)

        },

    })

}

export default vueBounce
