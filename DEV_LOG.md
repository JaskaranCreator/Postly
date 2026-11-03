# Development Log – Postly

This document describes some of the development challenges, debugging approaches, and solutions involved in building Postly.

## Bug 1: Dark Mode Styling Inconsistency

**Problem:**

When dark mode was enabled, some components and sections did not change their appearance correctly.

**Diagnosis:**

I inspected the theme settings and checked the dark mode classes used across different pages and components.

**Solution:**

I updated the dark mode styling in the layout, navigation, and page components to maintain a consistent appearance.

**Learning:**

I learned the importance of managing themes consistently across reusable components.

---

## Bug 2: Displaying Post Author Information

**Problem:**

Posts and user details were received from separate API endpoints. Displaying the correct author information with each post required matching the data.

**Diagnosis:**

I examined the `userId` property in the posts API response and compared it with the IDs returned by the users API.

**Solution:**

I used the matching `userId` to associate each post with its corresponding user information.

**Learning:**

I learned how to combine related data from multiple API endpoints in React applications.

---

## Bug 3: Handling API Loading and Error States

**Problem:**

API requests may take time to complete or fail, so the application needs to handle different request states properly.

**Diagnosis:**

I reviewed the API request flow and checked how the application handled loading, successful responses, and errors.

**Solution:**

I implemented loading indicators and error messages to provide clear feedback while fetching data.

**Learning:**

I learned that handling asynchronous API requests properly improves application reliability and user experience.

---

## Development Summary

Building Postly improved my practical understanding of React, component architecture, API integration, state management, responsive design, and debugging.

