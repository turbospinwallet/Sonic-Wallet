import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client';
import { NETWORK } from '@/common/constants/const';

export async function getChildrenObjectContract(parentResp: any, key: string) {
  const client = new SuiClient({ url: getFullnodeUrl(NETWORK) });
  const parentId = parentResp.data.content.fields[key].fields.contents.fields.id.id;
  const r = await client.getDynamicFields({
    parentId,
  });
  const o = new Array(r.data.length);
  const i = r.data.map(async (c) => {
    let h;
    const u = await client.getObject({
      id: c.objectId,
      options: {
        showContent: true,
      },
    });
    const {
      name: d,
      value: { fields: p },
      // @ts-expect-error ignore
      // eslint-disable-next-line no-cond-assign
    } = (h = u.data) == null ? void 0 : h.content.fields;
    return {
      id: d,
      data: p,
    };
  });
  const a = await Promise.all(i);
  for (let c = 0; c < a.length; c++) {
    const { id: u, data: d } = a[c];
    o[parseInt(u)] = d;
  }
  return o;
}
