const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/User');
const Subscription = require('../models/Subscription');

exports.createSubscription = async (req, res) => {
  const { userId, plan } = req.body;

  try {
    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new customer on Stripe
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user._id.toString() }
    });

    // Create a new subscription on Stripe
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: plan }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent']
    });

    // Save subscription details to your database
    const newSubscription = new Subscription({
      user: user._id,
      stripeCustomerId: customer.id,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      plan,
      currentPeriodEnd: subscription.current_period_end,
    });

    await newSubscription.save();

    // Update the user's subscription status in the User model (optional)
    user.subscription = newSubscription._id;
    await user.save();

    res.json({ message: 'Subscription created successfully', subscription });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};
