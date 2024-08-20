import { getAssets } from '@/actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';

const AssetSelect = ({ value, onValueChange }) => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    getAssets().then(setAssets);
  }, []);

  useEffect(() => {
    if (!value)
      onValueChange(assets.find((asset) => asset.assetId === 'usdt-tron'));
  }, [value, assets]);

  if (!assets.length || !value)
    return <Skeleton className="h-[100px] w-[420px]" />;

  return (
    <Select
      onValueChange={(value) =>
        onValueChange(assets.find((asset) => asset._id === value))
      }
      value={value._id}
    >
      <SelectTrigger className="w-full rounded-xl py-10">
        <SelectValue>
          <div className="flex items-center gap-3">
            <img src={value.logo} alt={value.name} height={40} width={40} />
            <div>
              <div className="text-start text-xl font-bold">{value.name}</div>
              <div className="text-start">
                {value.networkId.charAt(0).toUpperCase() +
                  value.networkId.slice(1)}
              </div>
            </div>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="max-h-48">
        {assets.map((a) => (
          <SelectItem key={a._id} value={a._id}>
            <div className="flex items-center gap-4">
              <img src={a.logo} alt={a.name} height={40} width={40} />
              <div>
                <div className="text-start text-xl font-bold">{a.name}</div>
                <div>
                  {a.networkId.charAt(0).toUpperCase() + a.networkId.slice(1)}
                </div>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { AssetSelect };
