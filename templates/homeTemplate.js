//Import necessary components as needed (logoBar, priceCard, etc..)

export const homeTemplate = `
    <main class="main">
     ${logoBarComponent(logo)}
      <section class="hero">
        <div class="hero__left">
          <h1 class="heading hero__title">
            A simple solution to complex tasks is coming soon
          </h1>
          <p class="sub-heading hero__sub-title">
            Say goodbye to inefficient juggling of multiple apps, teams, and
            projects. Officelite is the new collaboration platform built with an
            intuitive interface to improve productivity.
          </p>
          ${buttonComponent()}
        </div>
        <div class="hero__right">
          <img
            src="${charts}"
            alt="Statistical charts image"
            class="hero__image"
          />
        </div>
      </section>
      <section class="pricing">
        <div class="pricing__card-container">
          ${priceCardComponent(
            "white",
            "Basic",
            "Free",
            "Up to 5 users for free",
            [
              "Basic documents collaboration",
              "2 GB Stroage",
              "Great security and support",
            ],
            { path: "/signup", color: "light-blue", text: "Try for Free" }
          )}
         

          <!--PLACE HOLDER -->
          ${priceCardComponent(
            "blue",
            "Pro",
            "$9.99",
            "Per user, billed monthly",
            [
              "All essential integrations",
              "5 GB Stroage",
              "More control and insights",
            ],
            { path: "/signup", color: "white", text: "Try for Free" }
          )}

          <!--PLACE HOLDER -->
            ${priceCardComponent(
              "white",
              "Ultimate",
              "$19.99",
              "Per user, billed monthly",
              ["Robust work management", "100 GB Stroage", "VIP Support"],
              { path: "/signup", color: "light-blue", text: "Try for Free" }
            )}

        </div>
        <div class="countdown">
          <p class="upper-text white">
            Coming <span class="blue">4 Nov 2025</span>
          </p>
          <div class="countdown__container">

          ${countdownCardComponent({ label: "days", number: 0 })}
          ${countdownCardComponent({ label: "hours", number: 0 })}
          ${countdownCardComponent({ label: "min", number: 0 })}
          ${countdownCardComponent({ label: "sec", number: 0 })}
            
          </div>
          ${buttonComponent("/signup", "blue", "Get Started", false)}
        </div>
      </section>
    </main>
`;
export const homeFooter = `<footer class="footer"></footer>`;
