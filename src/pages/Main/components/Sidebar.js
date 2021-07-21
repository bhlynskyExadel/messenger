import React from 'react';
import { Divider, Drawer, Typography } from '@material-ui/core';
import { useStyles } from '../styles';
import { connect } from 'react-redux';
import GroupPreview from './GroupPreview';
import { labels } from '../services/main-constants';
const Sidebar = (props) => {
    const classes = useStyles();
    const { groups, currentGroupId } = props;

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={true}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.containerHeader}>
                <Typography variant="h2" align="center">
                    {labels.SIDEBAR_HEADER}
                </Typography>
            </div>
            <Divider />
            {groups.length ? (
                groups.map((item) => (
                    <div
                        className={
                            currentGroupId === item.id
                                ? classes.groupPreviewActive
                                : classes.groupPreview
                        }
                        key={item.id}
                    >
                        <Divider variant="middle" />
                        <GroupPreview
                            groupId={item.id}
                            groupName={item.groupName}
                            messageData={item.messages[item.messages.length - 1]}
                        />
                    </div>
                ))
            ) : (
                <Typography variant="subtitle1">{labels.SIDEBAR_NO_GROUPS}</Typography>
            )}
        </Drawer>
    );
};
const mapStateToProps = (state) => ({
    groups: state.Main.groups,
    currentGroupId: state.Main.currentGroupId,
});

export default connect(mapStateToProps)(Sidebar);
