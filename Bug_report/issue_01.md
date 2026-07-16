### **Bug Report: Broken/Missing Default Image for Newly Created Room**

---

#### **Summary**

A broken image icon is displayed for the newly created "Single" room instead of a functional default placeholder image.

#### **Environment**

- **URL**: `https://automationintesting.online/#/booking`
- **Browser**: Google Chrome (Desktop)

#### **Description**

When a room is created without a custom image, the system fails to display a default placeholder image. Instead, the UI renders a broken image element, which negatively impacts the site's aesthetic and user experience.

#### **Steps to Reproduce**

1.  Navigate to the booking page: `https://automationintesting.online/#/booking`.
2.  Scroll to the **"Our Rooms"** section.
3.  Observe the card labeled "Single".

#### **Expected vs. Actual Result**

- **Expected**: The system should display a default placeholder image for rooms where no image has been uploaded.
- **Actual**: The system displays a broken image icon with the alt text "Single Room".

#### **Severity**

- **Minor**: The functionality of the site (booking) remains intact, but the visual presentation is degraded.

#### **Visual Evidence**

- **Attachment**: `Screen Recording 2026-07-11 144032.mp4`
