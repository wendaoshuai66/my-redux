import { Children, Component } from "react";

export function createProvider(storeKey = 'store', subKey) {
    const subscriptionKey = subKey || `${storeKey}Subscription`

    class Provider extends Component {
        getChildContext() {
            return { [storeKey]: this[storeKey], [subscriptionKey]: null }
        }

        constructor(props, context) {
            super(props, context)
            this[storeKey] = props.store;
        }

        render() {
            return Children.only(this.props.children)
        }
    }

    Provider.childContextTypes = {
        [storeKey]: storeShape.isRequired,
        [subscriptionKey]: subscriptionShape,
    }

    return Provider
}