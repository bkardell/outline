var ct = 0,
  injectDefaultStyles = function(cssString) {
    var styleEl = document.createElement('style');
    styleEl.innerHTML = cssString;
    document.head.insertBefore(styleEl, document.head.firstElementChild);
  };

injectDefaultStyles(`
  [non-display] {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    border: 0;
  }
 o-h:not([role=heading]) {
     /* this needs a full reset here, if only everyone supported it.  */
     all: initial !important;
     font-weight: normal !important;
     font-size: 1rem !important;
     color: black;
}

 o-h {
  display: block;
  font-weight: bold;
  line-height: normal;
}
 o-h[aria-level='1'] {
     font-size: 3em;
 }

o-h[aria-level='2'] {
     font-size: 2.25em;
 }

o-h[aria-level='3'] {
     font-size: 1.75em;
 }

o-h[aria-level='4'] {
     font-size: 1.5em;
 }

o-h[aria-level='5'] {
     font-size: 1.25em;
 }

o-h[aria-level='6'] {
     font-size: 1.15em;
 }


o-h[aria-level='7'] {
     font-size: 1em;
 }

`);

var sectioningSelector = 'body, main, article, aside, nav, section';

document._getOutlineHeadings = function() {
  var headings = Array.prototype.slice.call(document.querySelectorAll('[outline-level]>[role="heading"]')),
    root = {
      owningSection: null,
      subSections: [],
      level: 0
    },
    ctx = root

  headings.forEach(function(item, i) {
    var tmp = ctx,
      itemLevel = item._level
    if (i === 0) {
      //root.heading = item;
    }
    if (itemLevel > ctx.level) {
      tmp = {
        owningSection: ctx,
        subSections: [],
        level: ctx.level + 1,
        heading: item,
        section: item.parentElement
      }
      ctx.subSections.push(tmp)
      ctx = tmp
    } else if (itemLevel === ctx.level) {
      ctx.owningSection.subSections.push({
        owningSection: ctx,
        subSections: [],
        level: ctx.level,
        heading: item,
        section: item.parentElement
      })
    } else if (itemLevel < ctx.level) {
      console.log('this happened...')
    }
  })

  return root
}

class OulineHeadingElement extends HTMLElement {

  get _level() {
    return parseInt(this.getAttribute('aria-level', -1), 10)
  }

  disconnectedCallback() {
    var parent = this.__parentElement,
      next = parent.firstElementChild,
      curLevel = this._level;

    if (curLevel) {
      if (next && next.tagName === 'O-H') {
        next.setAttribute('role', 'heading');
        next.setAttribute('aria-level', curLevel);
      } else {
        parent.removeAttribute('outline-level');
        parent.hasHeading = false;
      }
    }
    delete this.__parentElement;
  }

  connectedCallback() {
    var isParentSectioning = this.parentElement.matches(sectioningSelector)

    this.__parentElement = this.parentElement;

    if (isParentSectioning && !this.parentElement.hasHeading) {
      // find the closest thing with an outline-level
      var closest = this.parentElement.closest('[outline-level]'),
        // the current closest level is that or 0
        closestLevel = ((closest && closest.getAttribute('outline-level')) || 0)

      closestLevel++;

      console.log('closest ', closest)
      console.log('closestLevel ', closestLevel)

      // set the outline level
      this.parentElement.setAttribute('outline-level', closestLevel)
      console.log('marked heading for ', this.parentElement)

      this.setAttribute('role', 'heading')
      this.setAttribute('aria-level', closestLevel)

      this.parentElement.hasHeading = true
    }
  }
}

customElements.define('o-h', OulineHeadingElement)