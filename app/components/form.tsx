import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Form({
  providerName,
  title,
  partNumber,
  currencyType,
  close,
}: {
  providerName: string;
  title: string;
  partNumber: string;
  currencyType: string;
  close: () => void;
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const subscription = watch((data, { name, type }) => {
      if (
        (name === "price" ||
          name === "quantity" ||
          name === "discount" ||
          name === "finalPrice") &&
        type === "change"
      ) {
        setValue(
          "wholePrice",
          (Number(data.price) * Number(data.quantity) || 0).toString()
        );
        setValue(
          "finalPrice",
          (
            Number(watch("price")) -
              (Number(watch("discount")) / 100) * Number(watch("price")) || 0
          ).toString()
        );
        setValue(
          "finalWholePrice",
          (
            Number(watch("finalPrice")) * Number(watch("quantity")) || 0
          ).toString()
        );
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <div className="w-full border-[1px] border-gray-200 rounded-[20px] p-[20px]">
      <div className="flex flex-row justify-start flex-wrap gap-[50px] text-[14px] my-[20px] ">
        <div>
          <span className="font-bold">تامین کننده: </span>
          <span>{providerName}</span>
        </div>
        <div>
          <span className="font-bold">ثبت کننده قیمت: </span>
          <span>tفاطمه دلیریان</span>
        </div>
        <div>
          <span className="font-bold">عنوان: </span>
          <span>{title}</span>
        </div>
        <div>
          <span className="font-bold">پارت نامبر: </span>
          <span>{partNumber}</span>
        </div>
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row flex-wrap w-full">
          <label className="form-control w-1/3 px-[20px] ">
            <div className="label">
              <span className="label-text-alt">تعداد</span>
            </div>
            <input
              type="number"
              {...register("quantity", { required: true })}
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label h-[30px]">
              {errors.quantity && (
                <span className="label-text-alt text-red-500 leading-[0]">
                  فیلد اجباری
                </span>
              )}
            </div>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">قیمت واحد</span>
            </div>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label h-[30px]">
              {errors.price && (
                <span className="label-text-alt text-red-500 leading-[0]">
                  فیلد اجباری
                </span>
              )}
            </div>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">قیمت کل</span>
            </div>
            <input
              type="number"
              // value={Number(watch("price")) * Number(watch("quantity")) || 0}
              {...register("wholePrice")}
              className="input input-bordered w-full max-w-xs"
              disabled
            />
            <div className="label h-[30px]"></div>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">درصد تخفیف</span>
            </div>
            <input
              type="number"
              {...register("discount")}
              className="input input-bordered w-full max-w-xs"
            />
            <div className="label h-[30px]"></div>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">قیمت واحد نهایی</span>
            </div>
            <input
              type="number"
              {...register("finalPrice")}
              className="input input-bordered w-full max-w-xs"
              disabled
            />
            <div className="label h-[30px]"></div>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">قیمت کل نهایی</span>
            </div>
            <input
              type="number"
              {...register("finalWholePrice")}
              className="input input-bordered w-full max-w-xs"
              disabled
            />
            <div className="label h-[30px]"></div>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">دسته بندی</span>
            </div>
            <select className="select select-bordered pr-[40px] ">
              <option selected>محصول</option>
            </select>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">نوع تامین</span>
            </div>
            <select className="select select-bordered pr-[40px] " disabled>
              <option selected>رسمی</option>
            </select>
          </label>
          <label className="form-control w-1/3 px-[20px]">
            <div className="label">
              <span className="label-text-alt">نوع ارز</span>
            </div>
            <input
              type="text"
              {...register("currencyType", { value: currencyType })}
              className="input input-bordered w-full max-w-xs"
              disabled
            />
            <div className="label h-[30px]"></div>
          </label>
          <label className="form-control w-2/3 px-[20px]">
            <div className="label">
              <span className="label-text">شرایط پرداخت</span>
            </div>
            <textarea className="textarea textarea-bordered h-24"></textarea>
          </label>
        </div>

        <div className="mt-[20px] flex flex-row gap-[20px] justify-center ">
          <button
            className="btn btn-accent w-[100px] text-white "
            type="submit"
          >
            ثبت
          </button>
          <button
            type="button"
            onClick={() => close()}
            className="btn bg-gray-400 hover:bg-gray-400 w-[100px] text-white"
          >
            انصراف
          </button>
        </div>
      </form>
    </div>
  );
}
