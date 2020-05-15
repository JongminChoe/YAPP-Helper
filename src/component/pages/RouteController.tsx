import * as React from 'react';
import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
const Index = lazy(() => import('./Index'));
const SendEmail = lazy(() => import('./SendEmail'));

const RouteController = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<Switch>
				<Route path="/" exact={true} component={Index} />
				<Route path="/email" component={SendEmail} />
			</Switch>
		</Suspense>
	)
}

export default RouteController