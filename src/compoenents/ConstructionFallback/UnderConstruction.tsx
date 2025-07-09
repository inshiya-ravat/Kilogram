import { Result, Typography } from "antd";
import { ToolOutlined } from "@ant-design/icons";
import styles from "./UnderConstruction.module.css";

const { Title, Paragraph } = Typography;

interface UnderConstructionProps{
  name:string
}
const UnderConstruction = ({name}:UnderConstructionProps) => {
  return (
    <div className={styles.container}>
      <Result
        icon={<ToolOutlined className={styles.icon} />}
        title={
          <Title level={2} className={styles.title}>
            {name} Page is Under Construction
          </Title>
        }
        subTitle={
          <Paragraph className={styles.subtitle}>
            our devs are—probably fixing it with a coffee in hand ☕🛠️... Please check back soon!
          </Paragraph>
        }
        className={styles.result}
      />
    </div>
  );
};

export default UnderConstruction;
