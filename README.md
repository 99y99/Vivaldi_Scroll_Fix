Vivaldi Scrolling Fix for Permissions-Policy Errors
This userscript resolves scrolling issues on websites that trigger Permissions-Policy errors in the Vivaldi browser, particularly those related to the unrecognized 'browsing-topics' feature. It ensures that pages remain scrollable and provides an optional feature to suppress the error message in the console.
Problem
Certain websites utilize the Permissions-Policy header with features not recognized by Vivaldi, such as 'browsing-topics'. This incompatibility results in console errors and, in some cases, prevents users from scrolling the page. The typical error message appears as:
Error with Permissions-Policy header: Unrecognized feature: 'browsing-topics'.
Vivaldi: Prohibited blocking overflowing/scrolling of the document.

This issue is not isolated to a single website and can occur across multiple sites, disrupting the browsing experience.
Solution
This userscript addresses the problem through two key mechanisms:

Forced Scrollability:By injecting CSS, the script ensures that both the <html> and <body> elements have overflow: auto !important;. This overrides any attempts by the website to block or restrict scrolling, ensuring the page remains fully navigable.

Optional Error Suppression:The script includes an optional feature to suppress the specific 'browsing-topics' error message in the console. This keeps the console cleaner and reduces distractions, though it does not affect the functionality of the fix.


Installation
To install and use this userscript, follow these steps:

Install Tampermonkey:If you haven’t already, install the Tampermonkey extension for Vivaldi or any Chromium-based browser. Tampermonkey allows you to manage and run userscripts easily.

Add the Userscript:  

-Click on the Tampermonkey icon in your browser’s toolbar.
-Select "Create a new script..." from the menu.
-Copy the code from Global_fix.js and paste the code into the script editor:
-Save the Script:Press Ctrl + S or select "File > Save" in the Tampermonkey editor to save the script.

Verify the Fix:Visit a website where you previously experienced the scrolling issue. The page should now be fully scrollable.


Optional Features

Error Suppression:The script includes an optional section that hides the 'browsing-topics' error message in the console. If you prefer to keep this error visible for debugging or other purposes, you can comment out or remove the relevant code block (lines 23-31 in the script).

Notes

Compatibility:The script is designed to work on all websites (*://*/*). If it causes unintended behavior on specific sites, you can modify the @match directive to target only the problematic sites.

Vivaldi Updates:This script may become unnecessary if future updates to Vivaldi or the affected websites resolve the underlying Permissions-Policy issue. It’s recommended to periodically check if the script is still needed.

Customization:Feel free to adjust the script to better suit your needs. For example, you can target specific websites by changing the @match directive or modify the CSS to address other styling issues.

For any issues, suggestions, or contributions, please open an issue or pull request on this GitHub repository.
