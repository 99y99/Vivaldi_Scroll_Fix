// ==UserScript==
// @name         Global Scroll Fix
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Web sitelerinde kaydırma sorunlarını düzeltir
// @match        *://*/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    
    // Ana fonksiyon
    function fixScrolling() {
        // CSS stillerini geçersiz kılan bir stil etiketi oluşturma
        const style = document.createElement('style');
        style.innerHTML = `
            html, body {
                overflow: auto !important;
                overflow-x: auto !important;
                overflow-y: auto !important;
                overscroll-behavior: auto !important;
                height: auto !important;
                max-height: none !important;
                min-height: 100% !important;
                position: static !important;
                -webkit-overflow-scrolling: touch !important;
            }
            
            body * {
                overflow: visible;
                max-height: none;
            }
            
            ::-webkit-scrollbar {
                display: block !important;
                width: 12px !important;
                height: 12px !important;
            }
            
            ::-webkit-scrollbar-thumb {
                background-color: rgba(0, 0, 0, 0.3) !important;
                border-radius: 6px !important;
            }
            
            ::-webkit-scrollbar-track {
                background-color: rgba(0, 0, 0, 0.1) !important;
            }
            
            /* Yaygın bulunan ve scroll'u engelleyen fixed elementleri düzeltme */
            [style*="position: fixed"] {
                position: absolute !important;
            }
        `;
        
        document.head.appendChild(style);
        
        // Overflow özelliğini kontrol edip düzelten fonksiyon
        function fixOverflowRecursively() {
            // Overflow stilleri hesaplanmadan önce kısa bir gecikme
            setTimeout(() => {
                // HTML ve BODY elementlerinin overflow özelliklerini düzeltme
                document.documentElement.style.setProperty('overflow', 'auto', 'important');
                document.documentElement.style.setProperty('overflow-x', 'auto', 'important');
                document.documentElement.style.setProperty('overflow-y', 'auto', 'important');
                document.body.style.setProperty('overflow', 'auto', 'important');
                document.body.style.setProperty('overflow-x', 'auto', 'important');
                document.body.style.setProperty('overflow-y', 'auto', 'important');
                
                // Scroll engelleyici container'ları bulma ve düzeltme
                const allElements = document.querySelectorAll('body, body > div, body > main, body > section');
                allElements.forEach(element => {
                    const style = window.getComputedStyle(element);
                    if (style.overflow === 'hidden' || style.overflowY === 'hidden') {
                        element.style.setProperty('overflow', 'auto', 'important');
                        element.style.setProperty('overflow-y', 'auto', 'important');
                        element.style.setProperty('max-height', 'none', 'important');
                    }
                });
            }, 500);
        }
        
        // Sayfa yüklenince ve scroll olayında kontrolleri çalıştırma
        window.addEventListener('load', fixOverflowRecursively);
        window.addEventListener('scroll', fixOverflowRecursively, { passive: true });
        
        // MutationObserver ile DOM değişikliklerini izleme
        const observer = new MutationObserver((mutations) => {
            let shouldFix = false;
            
            for (const mutation of mutations) {
                if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'style' || mutation.attributeName === 'class')) {
                    shouldFix = true;
                    break;
                }
                
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    shouldFix = true;
                    break;
                }
            }
            
            if (shouldFix) {
                fixOverflowRecursively();
            }
        });
        
        // DOM değişikliklerini izlemeye başlama
        observer.observe(document.documentElement, {
            attributes: true,
            childList: true,
            subtree: true
        });
        
        // Sayfa yüklendiğinde kontrolleri çalıştırma
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fixOverflowRecursively);
        } else {
            fixOverflowRecursively();
        }
    }
    
    // Script'i hemen çalıştırma
    fixScrolling();
})();
