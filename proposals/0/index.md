# Description of Proposal 0
Adds a new element with a simpler definition (see rules) for creating a document outline.

# Impact on Use Cases
## Use Case 0
Unchanged, this document has no document outline today and would have none in the future.  As explained in [Headings and the Seinfeld Pitch](https://bkardell.com/blog/On-Headings.html) it may be visually possible to style/differentiate that the closing paragraph is part of the top level section or the subsection but it is impossible to know automatically even in this very simple case.

# Rules
Introduces the concept of an `OutlineTree`.  The following are potentially (but not necessarily) `OutlineSection`s:
  * <body>
  * <main>
  * <section>
  * <aside>
  * <nav>

These elements are only considered `OutlineSection`s if they contain a new element (`<o-h>` for the sake of argument as `OutlineHeading`) as their `.firstElementChild`. The element, used in any other fashion is meaningless.  Upon being added as the `.firstElementChild` of any potential outline section, the element will take up the role `heading` and the appropriate `aria-level` as indicated by its spot in the outline.  

An outline heading may be visually hidden via an attribute, or it may be displayed, but it only takes on visual meaning according to role and level.  This ensures that "meaningless" uses of this element are communicated to authors by default.

A DOM method is also added to the `document` object which returns the `OutlineTree` which connects `ownedSections` and `subsections`, allowing AT or code to clearly idenitify the elements, their names and their relationships.
