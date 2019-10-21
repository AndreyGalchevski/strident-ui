import React from 'react';

import Header from '../components/Header';

const styles = {
  aboutParagraph: {
    color: 'black',
    marginTop: 0,
  },
};

function About(): React.ReactElement {
  return (
    <section>
      <Header title="About" />
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <p className="flow-text" style={styles.aboutParagraph}>
            Strident is a thrash metal band formed in 2004 in the ancient city of Be`er Sheva
            (Israel). Starting from playing cover versions of such famous groups as Iron Maiden, AC
            / DC, etc and having come a long way, they found their style on the Israeli metal scene,
            despite the fact that in those years the scene was flooded with black metal and many
            hardcore bands. The group released its first album “On Aim” (2010), which raised the
            main problems of this world, on its own, thus challenging other popular styles. This
            album has become somewhat legendary, as it was the first full-length thrash metal album
            released in Israel back in the day. On 29 November 2019, their second album will out
            worldwide through Punishment 18 Records. The best thrash for lovers and connoisseurs of
            this style.
          </p>
          <p className="flow-text" style={styles.aboutParagraph}>
            Thrash `till Death!
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
