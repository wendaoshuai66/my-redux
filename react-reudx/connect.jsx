//高阶函数
function connect(mapStateToProps, mapDispatchToProps) {
    return class ConnectWrapper extends React.Component {
        render() {
            return (
                // that renders your component
                <WrappedComponent
                    {...this.props}
                    {...mapStateToProps(store.getState(), this.props)}
                    {...mapDispatchToProps(store.dispatch, this.props)}
                />
            )
        }

        componentDidMount() {

            this.unsubscribe = store.subscribe(this.handleChange.bind(this))
        }
        componentWillUnmount() {
            this.unsubscribe()
        }

        handleChange() {
            this.forceUpdate()
        }
    }
}