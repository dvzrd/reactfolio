App.Admin = React.createClass({
    mixins: [ReactMeteorData],

    getMeteorData() {
        let user = Meteor.user(),
            selector = {username: user.username},
            subscription = Meteor.subscribe('projects', selector);

        return {
            isLoading: !subscription.ready(),
            games: Projects.find({}, {sort: {createdAt: -1}}).fetch()
        };
    },

    render() {
        let noProjects = this.data.projects.length === 0,
            messageProps = {
                module: 'messages module',
                type: 'centered message',
                message: 'There are no projects'
            };

        if (this.data.isLoading) {
            return <App.Loading />;
        } else {
            return (
                <main className="animated fadeIn admin view">
                    {noProjects ? <App.Messages childProps={messageProps} /> :
                        <App.Projects projects={this.data.projects}/>}
                    <a className="fluid primary new project button" href="/admin/new">New Project</a>
                </main>
            );
        }
    }
});