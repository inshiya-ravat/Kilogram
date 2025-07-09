import { Button, Drawer, Menu } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  CompassOutlined,
  VideoCameraOutlined,
  UserOutlined,
  SettingOutlined,
  MessageOutlined,
  NotificationOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styles from "./Sidebar.module.css";
import Typography from "antd/es/typography";
import IconKilogram from "../../assets/IconKilogram";
import { useState } from "react";
import UnderConstruction from "../ConstructionFallback/UnderConstruction";
import { ROUTE } from "../../constants/routes.constants";

const Sidebar = () => {
  const [openNotification,setOpenNotification] = useState(false);
  const [openSearch,setOpenSearch] = useState(false);

  function openNotificationDrawer(){
    setOpenNotification(true);
  }
  function onCloseNotificationDrawer() {
    setOpenNotification(false);
  };
  function openSearchNotification(){
    setOpenSearch(true);
  }
  function onCloseSearchNotification() {
    setOpenSearch(false);
  };

  return (
    <div className={styles.sidebar}>
      <Typography.Title level={3} className={styles.logo}>
        <IconKilogram /> Kilogram
      </Typography.Title>
      <Menu mode="vertical" className={styles.menu}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to={ROUTE.HOME}>Home</Link>
        </Menu.Item>
        <Menu.Item key="search" icon={<SearchOutlined />}>
          <Link to="#" type="button" onClick={openSearchNotification}>Search</Link>
          <Drawer
            placement="left"
            closable={false}
            onClose={onCloseSearchNotification}
            open={openSearch}
          >
            <UnderConstruction name="Search"/>
          </Drawer>
        </Menu.Item>
        <Menu.Item key="explore" icon={<CompassOutlined />}>
          <Link to={ROUTE.EXPLORE}>Explore</Link>
        </Menu.Item>
        <Menu.Item key="reels" icon={<VideoCameraOutlined />}>
          <Link to={ROUTE.REEL}>Reels</Link>
        </Menu.Item>
        <Menu.Item key="chat" icon={<MessageOutlined />}>
          <Link to={ROUTE.CHAT}>Chats</Link>
        </Menu.Item>
        <Menu.Item key="notifcation" icon={<NotificationOutlined />}>
          <Link to="#" type="button" onClick={openNotificationDrawer}>Notifications</Link>
          <Drawer
            placement="left"
            closable={false}
            onClose={onCloseNotificationDrawer}
            open={openNotification}
          >
            <UnderConstruction name="Notification"/>
          </Drawer>
        </Menu.Item>
        <Menu.Item key="profile" icon={<UserOutlined />}>
          <Link to={ROUTE.PROFILE}>Profile</Link>
        </Menu.Item>
        <Menu.Item key="settings" icon={<SettingOutlined />}>
          <Link to={ROUTE.SETTINGS}>Settings</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;
