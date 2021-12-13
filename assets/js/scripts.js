lightSchemeIcon = document.querySelector('link#light-scheme-icon');
darkSchemeIcon = document.querySelector('link#dark-scheme-icon');

function onUpdate() {
    if(matcher.matches) {
        lightSchemeIcon.remove();
        document.head.append(darkSchemeIcon);
    }
    else {
        document.head.append(lightSchemeIcon);
        darkSchemeIcon.remove();
    }
}