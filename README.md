# ExpressJS OpenFeature JavaScript Demo

Demo of OpenFeature usage in an ExpressJS server, in plain JavaScript.

At the time of writing (26th October 2024), OpenFeature's tutorials really push for developers to use some complex cloud-hosted or Docker-managed flag provider service. That's an insane way to try to introduce people to something. Introductory tutorials can't assume knowledge like that! 

So, this repo shows one of the simpler ways to use OpenFeature: load up some JSON and parse it. 

Server process flow:

1. Request comes in.
2. Server initialises.
3. Server applies a middleware to all routes: `setUpFlagProvider`
4. Server checks for a flag and wants to make it available to all routes: `checkBananaFlag`
	- This could instead be applied to a singular router or route, so that flags are only checked on routes that need that flag.
	- Flag data is attached to a custom `response.flags` object, but this flag data could be saved to anything. `response` is chosen because it'll be available to any other middleware as well as the final callback for the route handler, so the flag data will be available on every bit of that handler chain.
5. Middleware chain proceeds along until a route's callback is reached.
6. Route callbacks use the checked flags in conditional logic.



## Demo Usage

To see how this feature flag stuff impacts the server functionality, clone the repo and follow these steps:

1. Install project dependencies with `npm install`
2. Run the server in hot-reload mode with `npm run dev`
3. Visit `localhost:8080` in your web browser.
4. Open up the `flags.json` file in the root of this repo.
5. Modify the `"defaultVariant": "off"` line so that `off` is replaced with `on`.
6. Refresh the server page in the web browser. The `npm run dev` step should've made the server hot-reload on a change to that flag file, so the response in the browser will be different!

## Next Steps

Next steps could go in various directions:

- look into more-complex ways to host the flag data (eg. environment variables using the [Environment Variable Provider](https://github.com/open-feature/js-sdk-contrib/tree/main/libs/providers/env-var), or whatever online file storage or database storage you use to simply store some JSON data)
- convert the flag JSON into a JavaScript object, so that more-powerful and dynamic [targeting](https://openfeature.dev/docs/reference/technologies/server/javascript/#targeting) could be implemented to make per-user flags