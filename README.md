# Edit Review

- Add toggle edit button to post show view
- Add edit form to the post show view
- Add edit-form rule to post-show.css
- Add jQuery to post-show-layout
- Add click event listener script to post show view
  - Toggle text cancel/edit
  - Toggle edit-form visibility

# Review Delete

- Create a delete button with a form in the post show view
- In reviewDelete method:
  - Find post by id and update to pull reviews with matching review_id
  - find review by id and remove
  - flash success
  - redirect to back to post show
