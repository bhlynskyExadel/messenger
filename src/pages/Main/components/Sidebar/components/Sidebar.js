import React, { useEffect, useState } from 'react';
import { Typography, Modal, IconButton, Tooltip, List } from '@material-ui/core';
import { useStyles } from './styles';
import { connect } from 'react-redux';
import GroupPreview from './GroupPreview';
import { createGroupLabels, labels } from '../../../services/main-constants';
import CreateGroupModal from './CreateGroupModal';
import AddIcon from '@material-ui/icons/Add';
import MenuIcon from '@material-ui/icons/Menu';
import { GroupSearch } from './GroupSearch';

const Sidebar = (props) => {
    const classes = useStyles();
    const { groups, currentGroupId } = props;
    const [modalIsOpen, setModalOpen] = useState(false);
    const [sidebarIsOpen, setSidebarOpen] = useState(true);
    const [groupSearchValue, setGroupSearchValue] = useState('');
    const [groupList, setGroupList] = useState([]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const onGroupSearch = (e) => {
        const targetName = e.target.value;

        if (targetName !== '') {
            const filteredGroups = groups.filter((group) => {
                return group.groupName.toLowerCase().startsWith(targetName.toLowerCase());
            });

            setGroupList(filteredGroups);
        } else {
            setGroupList(groups);
        }

        setGroupSearchValue(targetName);
    };

    const MenuButton = () => {
        return (
            <Tooltip title={labels.SIDEBAR_OPEN_TOOLTIP}>
                <IconButton
                    onClick={() => {
                        setSidebarOpen(!sidebarIsOpen);
                    }}
                    className={sidebarIsOpen ? classes.menuIcon : classes.menuIconMinimized}
                >
                    <MenuIcon />
                </IconButton>
            </Tooltip>
        );
    };

    useEffect(() => {
        setGroupList(groups);
    }, [groups]);

    if (sidebarIsOpen) {
        return (
            <div className={classes.sidebar}>
                <div className={classes.containerHeader}>
                    <Typography variant="h2" align="left">
                        {labels.SIDEBAR_HEADER}
                    </Typography>

                    <Tooltip title={createGroupLabels.NEW_GROUP_TOOLTIP}>
                        <IconButton onClick={handleOpenModal} className={classes.openModalIcon}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>

                    <MenuButton />
                </div>

                <GroupSearch onSearch={onGroupSearch} searchValue={groupSearchValue} />

                <Modal open={modalIsOpen} onClose={handleCloseModal}>
                    <CreateGroupModal handleClose={handleCloseModal} />
                </Modal>

                <List className={classes.groupList}>
                    {groupList.length ? (
                        groupList.map((item) => (
                            <div
                                className={
                                    currentGroupId === item.id
                                        ? classes.groupPreviewActive
                                        : classes.groupPreview
                                }
                                key={item.id}
                            >
                                <GroupPreview group={item} messageData={item.lastMessage} />
                            </div>
                        ))
                    ) : (
                        <Typography variant="subtitle1">{labels.SIDEBAR_NO_GROUPS}</Typography>
                    )}
                </List>
            </div>
        );
    } else {
        return (
            <div className={classes.sidebarMinimized}>
                <MenuButton />
            </div>
        );
    }
};

const mapStateToProps = (state) => ({
    groups: state.sidebarReducer.groups,
    currentGroupId: state.sidebarReducer.currentGroup.id,
});

export default connect(mapStateToProps)(Sidebar);
