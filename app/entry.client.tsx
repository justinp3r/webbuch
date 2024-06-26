import * as React from 'react';
import { RemixBrowser } from '@remix-run/react';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import ClientStyleContext from './src/ClientStyleContext';
import createEmotionCache from './src/createEmotionCache';
import { hydrateRoot } from 'react-dom/client';


interface ClientCacheProviderProps {
    children: React.ReactNode;
}
function ClientCacheProvider({ children }: ClientCacheProviderProps) {
    const [cache, setCache] = React.useState(createEmotionCache());

    const clientStyleContextValue = React.useMemo(
        () => ({
            reset() {
                setCache(createEmotionCache());
            },
        }),
        [],
    );

    return (
        <ClientStyleContext.Provider value={clientStyleContextValue}>
            <CacheProvider value={cache}>{children}</CacheProvider>
        </ClientStyleContext.Provider>
    );
}

const hydrate = () => {
    React.startTransition(() => {
        hydrateRoot(
            document,
            <ClientCacheProvider>
                {}
                <CssBaseline />
                <RemixBrowser />
            </ClientCacheProvider>,
        );
    });
};

if (window.requestIdleCallback) {
    window.requestIdleCallback(hydrate);
} else {
    window.setTimeout(hydrate, 1);
}
