import { Col, Layout } from "antd"
import Sider from "antd/es/layout/Sider"
import Sidebar from "../../Sidebar/Sidebar"
import { Outlet } from "react-router-dom"
import styles from "./MainLayout.module.css";

const MainLayout = () => {
  return (
    <Layout className={styles.mainLayout}>
      <Sider>
        <Sidebar/>
      </Sider>
      <Col className={styles.right}>
        <Outlet/>
      </Col>
    </Layout>
  )
}

export default MainLayout
