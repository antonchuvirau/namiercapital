'use strict';

function onFormSubmitHandler(evt) {
    const target = evt.target;
    const formSubmitButton = target.querySelector(`button[type="submit"]`);

    formSubmitButton.textContent = `Sending...`;
    formSubmitButton.classList.add(`form__button_in-progress`);
}

function resetInProgressFormStyles(evt) {
    const target = evt.target;
    const formSubmitButton = target.querySelector(`button[type="submit"]`);

    setTimeout(function () {
        formSubmitButton.textContent = `Send`;
        formSubmitButton.classList.remove(`form__button_in-progress`);
    }, 350);
}

function onFormMailSentHandler(evt) {
    resetInProgressFormStyles(evt);
    // Show success modal
    setTimeout(function () {
        jQuery(`.contact-form-modal`).modal();
    }, 350);
}

function onFileFormInputChangeHandler(evt) {
    const target = evt.target;
    const files = target.files;
    target.closest(`.form__file`).querySelector(`.form__file-name`).textContent = files[0].name;
}

function onMobileMenuOpenButtonClickHandler() {
    if (headerStickyElement) {
        headerStickyElement.classList.toggle(`header_active`);
    }
    mobileMenuOpenButton.classList.toggle(`header__mobile-menu-button_active`);
    navigationElement.classList.toggle(`header__navigation_open`);
}

function resetFilter(filterElements) {
    for (const filterElement of filterElements) {
        filterElement.classList.remove(`d-none`);
    }
}

function filter(filteredElement, filterElements) {
    for (const filterElement of filterElements) {
        const filterElementTags = filterElement.dataset.tags.split(', ');
        if (!filterElementTags.includes(filteredElement, 0)) {
            filterElement.classList.add(`d-none`);
        }
    }
}

function onFilterContainerClickHandler(evt) {
    const target = evt.target;
    const filterElements = document.querySelectorAll(`[data-tags]`);
    const targetFilterValue = target.textContent;

    if (target.matches(`button`)) {
        if (target.classList.contains(`filter__button_active`)) {
            for (const filterButton of filterButtons) {
                filterButton.classList.remove(`filter__button_disable`);
            }
            target.classList.remove(`filter__button_active`);

            // Reset filter
            resetFilter(filterElements);
        } else {
            for (const filterButton of filterButtons) {
                filterButton.classList.add(`filter__button_disable`);
                filterButton.classList.remove(`filter__button_active`);
            }
            target.classList.remove(`filter__button_disable`);
            target.classList.add(`filter__button_active`);

            // Init filter
            filter(targetFilterValue, filterElements);
        }
    }
}

// Variables
const form = document.querySelector(`.wpcf7-form`);
const wpcf7form = document.querySelector(`.wpcf7`);
const fileFormInput = document.querySelector(`input[type="file"]`);
const mobileMenuOpenButton = document.querySelector(`.header__mobile-menu-button`);
const navigationElement = document.querySelector(`.header__navigation`);
const headerStickyElement = document.querySelector(`.header_sticky`);
const filterContainer = document.querySelector(`.filter`);
const filterButtons = document.querySelectorAll(`.filter__button`);

// Events
document.addEventListener(`DOMContentLoaded`, () => {
    mobileMenuOpenButton.addEventListener(`click`, onMobileMenuOpenButtonClickHandler);
    if (form) {
        form.addEventListener(`submit`, onFormSubmitHandler);
        wpcf7form.addEventListener(`wpcf7invalid`, resetInProgressFormStyles);
        wpcf7form.addEventListener(`wpcf7mailsent`, onFormMailSentHandler);
        fileFormInput.addEventListener(`change`, onFileFormInputChangeHandler, false);
    }
    if (filterContainer) {
        filterContainer.addEventListener(`click`, onFilterContainerClickHandler);
    }
});