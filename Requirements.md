# Cardiff University Open Day UI Enhancement Task (60 mins)

## Objective
The project will involve applying Cardiff University branding, enhancing the user interface and implementing a modern, responsive layout.


## Functional Requirements

### 1. **Card Interactions**
- Each **topic card** displays:
  - Image
  - Topic title (e.g. Architecture)
  - Short description
- On **hover**:
  - Card slightly scales
- On **click**:
  - An **accessible modal** opens showing the list of events:
    - Event title, time, location

---

### 2. **Accessible Modal**
- Keyboard accessible:
  - Trap focus
  - Escape key to close
  - Close button with `aria-label`
- Uses `dialog` or ARIA `role="dialog"`
- Focus returns to last focused element when closed

---

### 3. **Search Functionality**
- Add an input field above the card grid
- Filters visible cards by topic title (case insensitive)
- Accessible input:
  - `aria-label="Search topics"`
  - Visible focus ring
- If no matches, show a friendly message: _“No topics found.”_
- Note: If more time were available, I would implement fuzzy search to handle partial matches, typos, and improve search flexibility.

---

### 4. **Calendar Feature**
- Each scheduled event shows:
  - Topic
  - Time
  - Remove button