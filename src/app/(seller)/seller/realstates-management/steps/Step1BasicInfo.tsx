import { Field, ErrorMessage, useFormikContext } from "formik";

const transactionTypes = [
  { value: "direct_purchase", label: "فروش" },
  { value: "rent", label: "اجاره" },
];

export default function Step1BasicInfo() {
  const { values, setFieldValue } = useFormikContext<any>();

  return (
    <div className=" rounded-xl p-2 mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1 text-sm font-medium">نام ملک:</label>
          <Field
            name="title"
            className="form-input w-full"
            placeholder="مثال: ویلای لوکس استخردار"
          />
          <ErrorMessage
            name="title"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">ظرفیت (نفر):</label>
          <Field
            name="capacity"
            type="number"
            className="form-input w-full"
            placeholder="مثال: 2"
            min="1"
            max="30"
          />
          <ErrorMessage
            name="capacity"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">قیمت:</label>
          <div className="flex items-center gap-2">
            <Field
              name="price"
              type="number"
              className="form-input w-full"
              placeholder="مثال: 6000000"
              min="1"
              max="1000000000000"
            />
            <span className="text-gray-500">ریال</span>
          </div>
          <ErrorMessage
            name="price"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">نوع معامله:</label>
          <Field
            as="select"
            name="transaction_type"
            className="form-input w-full"
            required
          >
            <option value="">انتخاب کنید</option>
            {transactionTypes.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </Field>
          <ErrorMessage
            name="transaction_type"
            component="div"
            className="text-red-500 text-xs mt-1"
          />
        </div>
      </div>
      <div>
        <label className="block mb-1 text-sm font-medium">توضیحات ملک:</label>
        <Field
          as="textarea"
          name="caption"
          rows={3}
          className="form-input w-full"
          placeholder="توضیحات کامل ملک را وارد کنید..."
        />
        <ErrorMessage
          name="caption"
          component="div"
          className="text-red-500 text-xs mt-1"
        />
      </div>
    </div>
  );
}
