import React from 'react';

import Header from '../components/Header';
import { PRIMARY_COLOR, LIGHT_COLOR } from '../utils/constants';

const styles = {
  aboutParagraph: {
    marginTop: 0,
  },
  card: {
    boxShadow: `0 4px 8px 0 ${PRIMARY_COLOR}, 0 6px 20px 0 ${PRIMARY_COLOR}`,
    backgroundColor: PRIMARY_COLOR,
    color: LIGHT_COLOR,
  },
};

function About(): React.ReactElement {
  return (
    <section>
      <Header title="About" />
      <div className="row">
        <div className="col s12 m8 offset-m2">
          <div className="card" style={styles.card}>
            <div className="card-content">
              <p className="flow-text" style={styles.aboutParagraph}>
                Strident is a thrash metal band formed in 2004 in the ancient city of Be`er Sheva
                (Israel). Starting from playing cover versions of such famous groups as Iron Maiden,
                AC / DC, etc and having come a long way, they found their style on the Israeli metal
                scene, despite the fact that in those years the scene was flooded with black metal
                and many hardcore bands. The group released its first album “On Aim” (2010), which
                raised the main problems of this world, on its own, thus challenging other popular
                styles. This album has become somewhat legendary, as it was the first full-length
                thrash metal album released in Israel back in the day. On 29 November 2019, their
                second album will out worldwide through Punishment 18 Records. The best thrash for
                lovers and connoisseurs of this style.
              </p>
              <p className="flow-text" style={styles.aboutParagraph}>
                Thrash `till Death!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
