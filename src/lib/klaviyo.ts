// Klaviyo Client API — subscribes an email to a list from the browser.
// Uses the Public API key (a.k.a. company_id). Safe to expose client-side.
// https://developers.klaviyo.com/en/reference/create_client_subscription

const PUBLIC_KEY = import.meta.env.VITE_KLAVIYO_PUBLIC_KEY as string | undefined;
const LIST_ID = import.meta.env.VITE_KLAVIYO_LIST_ID as string | undefined;

interface SubscribeOptions {
  email: string;
  source?: string; // e.g. "Email Capture Popup"
}

export async function subscribeToKlaviyo({ email, source = "Website Popup" }: SubscribeOptions): Promise<void> {
  if (!PUBLIC_KEY || !LIST_ID) {
    throw new Error(
      "Klaviyo not configured — set VITE_KLAVIYO_PUBLIC_KEY and VITE_KLAVIYO_LIST_ID in .env"
    );
  }

  const res = await fetch(
    `https://a.klaviyo.com/client/subscriptions/?company_id=${PUBLIC_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        revision: "2024-10-15",
      },
      body: JSON.stringify({
        data: {
          type: "subscription",
          attributes: {
            custom_source: source,
            profile: {
              data: {
                type: "profile",
                attributes: { email },
              },
            },
          },
          relationships: {
            list: { data: { type: "list", id: LIST_ID } },
          },
        },
      }),
    }
  );

  // Klaviyo returns 202 Accepted on success, no body
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Klaviyo subscribe failed: ${res.status} ${text}`);
  }
}
