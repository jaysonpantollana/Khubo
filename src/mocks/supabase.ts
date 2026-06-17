type MockResponseData = { data: unknown; error: null; count: null };

function createFilterBuilder() {
  const then = (resolve: (value: MockResponseData) => void) => resolve({ data: [], error: null, count: null });
  return {
    eq: (_column: string, _value: unknown) => createFilterBuilder(),
    select: (_columns?: string, _options?: { count?: string; head?: boolean }) => createFilterBuilder(),
    order: (_column: string, _options?: { ascending?: boolean }) => ({ then }),
    maybeSingle: () => ({ then }),
    then,
  };
}

function createChannelBuilder() {
  const ch = {
    on: (_event: string, _config: Record<string, unknown>, _callback: () => void) => ch,
    subscribe: () => ch,
  };
  return ch;
}

function createChannel() {
  return {
    on: () => ({ on: () => ({ subscribe: () => {} }), subscribe: () => {} }),
    subscribe: () => {},
  };
}

interface MockSupabaseClient {
  auth: {
    getSession: () => Promise<{ data: { session: null } }>;
    onAuthStateChange: () => { data: { subscription: { unsubscribe: () => void } } };
    signOut: () => Promise<void>;
    signInWithPassword: (credentials: { email: string; password: string }) => Promise<{ data: { user?: { id: string } }; error: { message: string } | null }>;
    signUp: (credentials: { email: string; password: string }) => Promise<{ data: { user?: { id: string } }; error: { message: string } | null }>;
  };
  from: (table: string) => {
    select: (_columns?: string, _options?: { count?: string; head?: boolean }) => ReturnType<typeof createFilterBuilder>;
    insert: (_values: Record<string, unknown> | Record<string, unknown>[]) => ReturnType<typeof createFilterBuilder>;
    update: (_values: Record<string, unknown>) => ReturnType<typeof createFilterBuilder>;
    delete: () => ReturnType<typeof createFilterBuilder>;
  };
  channel: (name: string) => ReturnType<typeof createChannelBuilder>;
  removeChannel: (channel: ReturnType<typeof createChannelBuilder>) => void;
  storage: {
    from: (bucket: string) => {
      upload: (path: string, file: File) => Promise<{ data: unknown; error: null }>;
      getPublicUrl: (path: string) => { data: { publicUrl: string } };
    };
  };
}

export const supabase: MockSupabaseClient = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signOut: () => Promise.resolve(),
    signInWithPassword: () => Promise.resolve({ data: {}, error: null }),
    signUp: () => Promise.resolve({ data: {}, error: null }),
  },
  from: () => ({
    select: (_columns?: string, _options?: { count?: string; head?: boolean }) => createFilterBuilder(),
    insert: (_values: Record<string, unknown> | Record<string, unknown>[]) => createFilterBuilder(),
    update: (_values: Record<string, unknown>) => createFilterBuilder(),
    delete: () => createFilterBuilder(),
  }),
  channel: () => createChannelBuilder(),
  removeChannel: () => {},
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: {}, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
};
