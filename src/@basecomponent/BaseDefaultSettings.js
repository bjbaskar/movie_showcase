import _ from '@lodash';
import BaseSettingsConfig from 'baseconfigs/baseSettingsConfig';
import qs from 'qs';

const defaultSettings = {
    layout: {
        style: 'layout1',
        config: {
            scroll: 'content',
            navbar: {
                display: true,
                folded: false,
                position: 'left'
            },
            toolbar: {
                display: true,
                style: 'fixed',
                position: 'below'
            },
            footer: {
                display: true,
                style: 'fixed',
                position: 'below'
            },
            leftSidePanel: {
                display: true,
            },
            rightSidePanel: {
                display: true,
            },
            mode: 'fullwidth'
        }
    },
    customScrollbars: true,
    theme: {
        main: 'default',
        navbar: 'mainThemeDark',
        toolbar: 'mainThemeLight',
        footer: 'mainThemeDark'
    }
};

const parsedQueryString = qs.parse(window.location.search, { ignoreQueryPrefix: true });
let BaseSettingsQuery = {};

if (parsedQueryString && parsedQueryString.defaultSettings) {
    BaseSettingsQuery = JSON.parse(parsedQueryString.defaultSettings);
}

const BaseDefaultSettings = _.merge({}, defaultSettings, BaseSettingsConfig, BaseSettingsQuery);

// Generating route params from settings
/*const settings = qs.stringify({
    defaultSettings: JSON.stringify(defaultSettings, {strictNullHandling: true})
});
console.info(settings);*/

export default BaseDefaultSettings;
