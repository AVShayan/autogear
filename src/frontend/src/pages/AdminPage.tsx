import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, Package, Pencil, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../backend.d";
import {
  useAddProduct,
  useDeleteProduct,
  useGetProducts,
  useUpdateProduct,
} from "../hooks/useQueries";

const CATEGORIES = [
  "Interior",
  "Exterior",
  "Maintenance",
  "Electronics",
  "Tyres & Wheels",
];

interface FormData {
  name: string;
  description: string;
  price: string;
  category: string;
  stock: string;
  imageUrl: string;
}

const EMPTY_FORM: FormData = {
  name: "",
  description: "",
  price: "",
  category: "Interior",
  stock: "",
  imageUrl: "",
};

const FORM_FIELDS = [
  {
    field: "name",
    label: "Product Name",
    type: "text",
    placeholder: "e.g. Premium Seat Cover",
  },
  {
    field: "price",
    label: "Price (₹)",
    type: "number",
    placeholder: "e.g. 1499",
  },
  {
    field: "stock",
    label: "Stock Quantity",
    type: "number",
    placeholder: "e.g. 50",
  },
  {
    field: "imageUrl",
    label: "Image URL (optional)",
    type: "url",
    placeholder: "https://...",
  },
] as const;

export default function AdminPage() {
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<bigint | null>(null);

  const { data: products = [], isLoading } = useGetProducts();
  const addMutation = useAddProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const openAdd = () => {
    setEditProduct(null);
    setForm(EMPTY_FORM);
    setShowForm(true);
  };
  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({
      name: p.name,
      description: p.description,
      price: Number(p.price).toString(),
      category: p.category,
      stock: Number(p.stock).toString(),
      imageUrl: p.imageUrl,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const price = BigInt(Math.round(Number.parseFloat(form.price) || 0));
    const stock = BigInt(Number.parseInt(form.stock) || 0);
    try {
      if (editProduct) {
        await updateMutation.mutateAsync({
          id: editProduct.id,
          name: form.name,
          description: form.description,
          price,
          category: form.category,
          stock,
          imageUrl: form.imageUrl,
        });
        toast.success("Product updated!");
      } else {
        await addMutation.mutateAsync({
          name: form.name,
          description: form.description,
          price,
          category: form.category,
          stock,
          imageUrl: form.imageUrl,
        });
        toast.success("Product added!");
      }
      setShowForm(false);
      setForm(EMPTY_FORM);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Product deleted");
      setDeleteConfirm(null);
    } catch {
      toast.error("Failed to delete");
    }
  };

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display font-extrabold text-3xl uppercase tracking-widest">
            ADMIN <span className="text-primary">PANEL</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage your product catalog
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
          data-ocid="admin.add_product.button"
        >
          <Plus className="w-4 h-4" /> ADD PRODUCT
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {CATEGORIES.map((cat) => {
          const count = products.filter((p) => p.category === cat).length;
          return (
            <div key={cat} className="bg-card border border-border rounded p-4">
              <p className="text-muted-foreground text-xs uppercase tracking-widest">
                {cat}
              </p>
              <p className="font-display font-extrabold text-primary text-2xl mt-1">
                {count}
              </p>
            </div>
          );
        })}
      </div>

      {isLoading ? (
        <div className="space-y-3" data-ocid="admin.loading_state">
          {Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton
            <Skeleton key={i} className="h-16 rounded" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div
          className="text-center py-20 text-muted-foreground border border-dashed border-border rounded"
          data-ocid="admin.empty_state"
        >
          <Package className="w-12 h-12 mx-auto mb-4 text-primary/40" />
          <p className="font-display font-bold text-xl uppercase tracking-widest">
            No products yet
          </p>
          <p className="text-sm mt-2">Click ADD PRODUCT to get started</p>
        </div>
      ) : (
        <div className="border border-border rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-secondary border-b border-border">
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Product
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Price
                </th>
                <th className="text-left px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground hidden md:table-cell">
                  Stock
                </th>
                <th className="text-right px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr
                  key={String(p.id)}
                  className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors"
                  data-ocid={`admin.product.item.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <div className="font-semibold text-foreground">
                      {p.name}
                    </div>
                    <div className="text-muted-foreground text-xs mt-0.5 line-clamp-1">
                      {p.description}
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded uppercase">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-primary">
                    ₹{Number(p.price).toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                    {Number(p.stock)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => openEdit(p)}
                        className="p-1.5 rounded border border-border hover:border-primary hover:text-primary transition-colors"
                        data-ocid="admin.product.edit.button"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      {deleteConfirm === p.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => handleDelete(p.id)}
                            disabled={deleteMutation.isPending}
                            className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded font-bold hover:opacity-90"
                            data-ocid="admin.product.confirm_delete.button"
                          >
                            {deleteMutation.isPending ? (
                              <Loader2 className="w-3 h-3 animate-spin" />
                            ) : (
                              "CONFIRM"
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirm(null)}
                            className="text-xs border border-border px-2 py-1 rounded font-bold hover:border-primary"
                            data-ocid="admin.product.cancel_delete.button"
                          >
                            CANCEL
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setDeleteConfirm(p.id)}
                          className="p-1.5 rounded border border-border hover:border-destructive hover:text-destructive transition-colors"
                          data-ocid="admin.product.delete.button"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-ocid="admin.product.modal"
          >
            <motion.div
              className="bg-card border border-border rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-border">
                <h2 className="font-display font-bold uppercase tracking-widest">
                  {editProduct ? "EDIT PRODUCT" : "ADD PRODUCT"}
                </h2>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-ocid="admin.product.close.button"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                {FORM_FIELDS.map(({ field, label, type, placeholder }) => (
                  <div key={field}>
                    <label
                      htmlFor={`admin-${field}`}
                      className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5"
                    >
                      {label}
                    </label>
                    <input
                      id={`admin-${field}`}
                      type={type}
                      value={form[field]}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, [field]: e.target.value }))
                      }
                      placeholder={placeholder}
                      required={field !== "imageUrl"}
                      className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground"
                      data-ocid={`admin.product.${field}.input`}
                    />
                  </div>
                ))}

                <div>
                  <label
                    htmlFor="admin-category"
                    className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5"
                  >
                    Category
                  </label>
                  <select
                    id="admin-category"
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground"
                    data-ocid="admin.product.category.select"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="admin-description"
                    className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5"
                  >
                    Description
                  </label>
                  <textarea
                    id="admin-description"
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    placeholder="Brief description..."
                    required
                    rows={3}
                    className="w-full bg-secondary border border-border rounded px-3 py-2 text-sm focus:outline-none focus:border-primary text-foreground placeholder:text-muted-foreground resize-none"
                    data-ocid="admin.product.description.textarea"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 bg-primary text-primary-foreground font-bold py-2.5 rounded flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-60"
                    data-ocid="admin.product.submit.button"
                  >
                    {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                    {editProduct ? "UPDATE PRODUCT" : "ADD PRODUCT"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 border border-border text-foreground font-bold py-2.5 rounded hover:border-primary transition-colors"
                    data-ocid="admin.product.cancel.button"
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
