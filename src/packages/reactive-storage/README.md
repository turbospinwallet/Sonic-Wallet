## Mana storage

### Install

```
    yarn add @manabie-com/mana-storage
```

### Usage

1. Init the mana-storage instance

```
    // createLocalStorageAdaptor: use localStorage to store data
    import ManaStorage, {
      createLocalStorageAdaptor,
      StorageKey,
      createStorageOptions
    } from "@manabie-com/mana-storage";

    const KEY_TOKEN : StorageKey<string> = createStorageOptions({
       serialize: false,
       persistent: false
     })

    // new and recommended way, for explicit reason
    const manaStorage = new ManaStorage(adaptor, {
        TOKEN: KEY_TOKEN
    }, { prefix });
    // use
    manaStorage.get("TOKEN");
    manaStorage.set("TOKEN", "newToken")

    // legacy way, if you dont have time for migration
    const manaStorage = new ManaStorage(adaptor, storageKeysMap, {
            prefix,
            useDeprecated: true // <== enable legacy
    }) as ManaStorage<typeof storageKeysMap> & {
        // & for type suggestion
        TEST_KEY1: LocalStorageValue<string>;
        TEST_KEY2: LocalStorageValue<object>;
        TEST_KEY3: LocalStorageValue<string>;
    };
    console.log(manaStorage.TOKEN)
    manaStorage.TOKEN = "newToken";
```

2. Get/Set/Clear value

```ts
import manaStorage from 'src/internals/manaStorage';

// new
manaStorage.get('TOKEN');
manaStorage.set('TOKEN', 'newToken');

// legacy
manaStorage.TOKEN;
manaStorage.TOKEN = 'newToken';

// clear, for both
manaStorage.clear('TOKEN'); // clear this key only
manaStorage.clear(); // clear all "non-persistent" key
```

**\*Note: Set the value to `undefined` will automatically clear the key in storage**

3. React to value changes

To keep the consistency in micro frontends, the value changes will be propagated through listener (no cross browser tab).

```ts
import manaStorage from 'src/internals/manaStorage';

function MyComponent() {
  useEffect(() => {
    // listen to "LANGUAGE" changed
    const unsubcribe = manaStorage.registerListener<string>('LANGUAGE', (newLanguage) => {
      console.log(`User has changed the language to: ${newLanguage}`);
    });

    // remember to unsubcribe to prevent mem-leak
    return () => unsubcribe;
  }, []);
}
```

**Note: manaStorage listen to value changed through a CustomEvent fire to window object.**

### Options

1. `adaptor`: The adaptor instance, you can create yourself, just need to match the `Adaptor` interface (but you should not).
2. `StorageKeysMap`: an object that follow the interface of `Record<string, { serialize: boolean, persistent: boolean}>`
   ```ts
   const storageKeysMap = {
     TOKEN: {
       serialize: false, // should JSON.stringify before storing and JSON.parse after getting. True when you want to store "object-like" type
       persistent: false, // should keep the value even "clear" is called.
     },
     TIMEZONE: {
       serialize: true,
       persistent: true, // keep timezone even when the storage get cleared.
     },
   };
   ```
3. `options.prefix`: Save to the storage with this prefix. Example: if `prefix` is `MANABIE`, then `TOKEN` will be saved as `MANABIE_TOKEN` in the storage.
4. `options.useDeprecated`: Should enable legacy method, if you would like to keep the legacy way, please pass this options, else an error will be thrown.
