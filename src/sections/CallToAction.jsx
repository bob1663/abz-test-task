import Button from "../components/ui/Button";
import { scrollTo } from "../utils/utils";

const CallToAction = () => {
  return (
    <section
      className="w-full h-[650px] flex items-center justify-center
      bg-cta max-w-[1170px] self-center"
    >
      <div className="flex flex-col items-center justify-center max-w-[380px] text-center px-4">
        <h1 className="heading-text text-white">
          Test assignment for front-end developer
        </h1>
        <p className="body-text text-white mt-[21px]">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they`ll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <Button
          label="Sign up"
          btnStyle="max-w-[100px] mt-[32px]"
          onClick={() => scrollTo("sign-up")}
        />
      </div>
    </section>
  );
};

export default CallToAction;
