
const TopNavigation = () => {
    return (
        <header>
            <div data-cashierapp="standalone">
                <div className="cashier-app cashier-app--header hide">
                    <div className="cashier-app__header">
                        <div className="cashier-app__header-inner">
                            <div className="cashier-app__close-app">
                                <button id="close-cashier" className="btn btn-link btn-icon-large">
                                    <span className="icon glyphicon glyphicon-circle-arrow-left"></span>Back to Home </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default TopNavigation;