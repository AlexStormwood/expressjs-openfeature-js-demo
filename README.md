# ExpressJS OpenFeature JavaScript Demo

Demo of OpenFeature usage in an ExpressJS server, in plain JavaScript.

Server process flow:

1. Request comes in.
2. Server initialises.
3. Server applies a middleware to all routes: `setUpFlagProvider`
4. Server checks for a flag and wants to make it available to all routes: `checkBananaFlag`
	- This could instead be applied to a singular router or route, so that flags are only checked on routes that need that flag.
	- Flag data is attached to a custom `response.flags` object, but this flag data could be saved to anything. `response` is chosen because it'll be available to any other middleware as well as the final callback for the route handler, so the flag data will be available on every bit of that handler chain.
5. Middleware chain proceeds along until a route's callback is reached.
6. Route callbacks use the checked flags in conditional logic.

OpenFeature's tutorials really push for developers to use some complex cloud-hosted flag provider service. That's an insane way to try to introduce people to something. 

So, this repo shows the simplest way to use OpenFeature: load up some JSON and parse it.

Next steps could go in various directions:

- look into more-complex ways to host the flag data (eg. environment variables using the [Environment Variable Provider](https://github.com/open-feature/js-sdk-contrib/tree/main/libs/providers/env-var), or whatever online file storage or database storage you use to simply store some JSON data)
- convert the flag JSON into a JavaScript object, so that more-powerful and dynamic [targeting](https://openfeature.dev/docs/reference/technologies/server/javascript/#targeting) could be implemented to make per-user flags