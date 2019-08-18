import React, { Component } from 'react';
import BaseNavVerticalGroup from './vertical/BaseNavVerticalGroup';
import BaseNavVerticalCollapse from './vertical/BaseNavVerticalCollapse';
import BaseNavVerticalItem from './vertical/BaseNavVerticalItem';
import { Divider, List, Hidden } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const propTypes = {
    navigation: PropTypes.array.isRequired
};

const defaultProps = {
    layout: "vertical"
};

class BaseNavigation extends Component {
    render() {
        const { navigation, layout, active } = this.props;

        const verticalNav = (
            <List className="whitespace-no-wrap">
                {
                    navigation.map((item) => (

                        <React.Fragment key={item.id}>

                            {item.type === 'group' && (
                                <BaseNavVerticalGroup item={item} nestedLevel={0} active={active} />
                            )}

                            {item.type === 'collapse' && (
                                <BaseNavVerticalCollapse item={item} nestedLevel={0} active={active} />
                            )}

                            {item.type === 'item' && (
                                <BaseNavVerticalItem item={item} nestedLevel={0} active={active} />
                            )}

                            {item.type === 'divider' && (
                                <Divider className="my-16" />
                            )}
                        </React.Fragment>
                    ))
                }
            </List>
        );



        if (navigation.length > 0) {
            switch (layout) {
                case 'vertical':
                default:
                    {
                        return verticalNav;
                    }
            }
        }
        else {
            return '';
        }
    }
}

BaseNavigation.propTypes = propTypes;
BaseNavigation.defaultProps = defaultProps;

export default withRouter(BaseNavigation);
