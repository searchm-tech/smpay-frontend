import { Descriptions } from "@/components/composite/description-components";
import { LabelBullet } from "@/components/composite/label-bullet";
import { Modal } from "@/components/composite/modal-components";
import { Input } from "@/components/ui/input";
import DescriptionsItem from "antd/es/descriptions/Item";

type Props = {
  onClose: () => void;
};

const CreateModal = ({ onClose }: Props) => {
  const handleConfirm = () => {
    onClose();
  };

  return (
    <Modal
      title="광고주 정보 등록"
      open
      onClose={onClose}
      onConfirm={handleConfirm}
    >
      <div className="w-[80vw]">
        <LabelBullet>광고주 기본 정보</LabelBullet>

        <Descriptions columns={1} className="mt-4">
          <DescriptionsItem label="광고주명 *">
            <Input
              className="w-[500px]"
              placeholder="광고주를 구분할 수 있는 이름으로 입력하세요."
            />
          </DescriptionsItem>
          <DescriptionsItem label="대표자명 *">
            <Input className="w-[500px]" />
          </DescriptionsItem>
          <DescriptionsItem label="사업자 등록 번호 *">
            <Input className="w-[500px]" />
          </DescriptionsItem>
          <DescriptionsItem label="광고주 휴대폰 번호">
            <Input className="w-[500px]" />
          </DescriptionsItem>
          <DescriptionsItem label="광고주 이메일 주소">
            <Input className="w-[500px]" />
          </DescriptionsItem>
        </Descriptions>
      </div>
    </Modal>
  );
};

export default CreateModal;
