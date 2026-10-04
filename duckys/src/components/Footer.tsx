import DuckLogo from "./DuckLogo";

export default function Footer() {
  return (
    <footer className="footer">
      <section className="about" id="about">
        <h2 className="section-title">Who even are we? 🦆</h2>
        <p>
          Ducky&apos;s is what happens when a duck with impeccable taste opens a kitchen. Fresh dough every morning,
          sauces made in-house, and a level of confidence some find… excessive. We find it delicious.
        </p>
      </section>

      <section className="visit" id="visit">
        <div>
          <h4>Visit</h4>
          <p>
            123 Pond Street
            <br />
            Your City
          </p>
        </div>
        <div>
          <h4>Hours</h4>
          <p>
            Mon–Thu · 12pm – 12am
            <br />
            Fri–Sun · 12pm – 2am
          </p>
        </div>
        <div>
          <h4>Say hi</h4>
          <p>
            (000) 000-0000
            <br />
            hello@duckys.example
          </p>
        </div>
      </section>

      <div className="waddle-track" aria-hidden="true">
        <div className="waddler">
          <DuckLogo size={48} />
        </div>
      </div>
      <p className="copyright">© {new Date().getFullYear()} Ducky&apos;s. All rights reserved. No ducks were harmed.</p>
    </footer>
  );
}
