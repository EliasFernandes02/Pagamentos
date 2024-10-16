
const stripe = Stripe('');


async function initiateCheckout(amount) {
    try {

        const response = await fetch('http://127.0.0.1:4242/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                amount: amount 
            })
        });

        if (!response.ok) {
            throw new Error('Erro ao criar sessão de checkout');
        }

        const session = await response.json();

        const result = await stripe.redirectToCheckout({ sessionId: session.id });

        if (result.error) {
            alert(result.error.message);
        }

    } catch (error) {
        console.error('Erro:', error);
    }
}
