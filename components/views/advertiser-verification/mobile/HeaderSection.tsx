import { MobileTitle } from "@/components/common/Title";

const HeaderSection = () => {
  return (
    <section className="mt-10 flex flex-col px-3 text-[14px] font-medium text-[#545F71]">
      <span>
        다음은 SM Pay에서 선결제 서비스를 제공하기 위해 회원님의 정보를 활용하는
        것에 대한 안내입니다.
      </span>
      <span>
        여기에는 정보 활용 동의, SM Pay 부가 서비스 이용 동의, 개인정보 입력 및
        인증 사항이 포함되어 있습니다.
      </span>
      <span className="mt-4">
        SM Pay를 사용하려면 아래의 내용을 검토하고 동의해 주세요.
      </span>
    </section>
  );
};

export default HeaderSection;
