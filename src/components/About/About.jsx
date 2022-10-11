import "./about.scss";
import muscle from "../../img/muscle.png";
import vitamin from "../../img/about_vitamin-min.jpg";

const About = () => {
    return (
        <section className="about">
            <div className="container">
                <div className="about-wrapper">
                    <div className="about-wrapper__img">
                        <img src={vitamin} alt="girl and Coffee" />
                    </div>
                    <div className="about-wrapper__text">
                        <h2 className="about-wrapper__title">
                            Чому це корисно ?
                        </h2>
                        <div className="about-wrapper__icon">
                            <img src={muscle} alt="muscle" />
                        </div>
                        <p className="about-wrapper__descr">
                            Користь вітамінів для здоров'я полягає в їх
                            здатності запобігати і лікувати різні захворювання,
                            включаючи проблеми з серцем, високим рівнем
                            холестерину, захворювання очей, шкірних захворювань
                            і багатьох багатьох інших.
                            <br />
                            Вітаміни можна вживати в різних формах. Найбільш
                            поширеним способом отримати їх - через продукти, які
                            ми їмо. Тому важливо, якій саме кухні віддавати
                            перевагу і який Ваш звичайний раціон харчування.
                            Можливо, що звичайне харчування не надає організму
                            достатньої кількості вітамінів і мікроелементів. Для
                            таких випадків були винайдені харчові добавки, які
                            дають потрібні вітаміни при цьому не змінюючи
                            звичний раціон.
                        </p>
                    </div>
                </div>
            </div>
            <div className="about__divinner"></div>
        </section>
    );
};

export default About;
