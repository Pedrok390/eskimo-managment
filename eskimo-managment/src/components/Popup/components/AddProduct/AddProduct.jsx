import { useState } from "react"

export default function AddProduct(props){
    const {handleCreateProduct, categories, product, type} = props
    const categoryList = ["Nova Categoria", ...categories]
    const [currentCategory, setCurrentCategory] = useState("")
    const allergenOptions = [ "Amendoim",
        "Aveia",
        "Avelã",
        "Castanha-de-caju",
        "Castanha-do-pará",
        "Centeio",
        "Cevada",
        "Crustáceos",
        "Látex natural",
        "Leite",
        "Macadâmia",
        "Nozes",
        "Ovos",
        "Peixes",
        "Pecã",
        "Pistache",
        "Soja",
        "Trigo"
    ];
    const [imagePreview, setImagePreview] = useState(
        product?.image?.url || null
    );
    const [form, setForm] = useState(() => ({
        name: product?.name || "",
        category: product?.category || "",
        price: product?.price
            ? String(product.price).replace(".", ",")
            : "",

        sale: {
            promotionalPrice:
            product?.sale?.promotionalPrice != null
                ? String(product.sale.promotionalPrice).replace(".", ",")
                : "",

            quantity:
            product?.sale?.quantity || 0
        },

        image: null,

        description: product?.description || "",

        allergy: product?.allergy || [],

        gluten: product?.gluten || "CONTÉM GLÚTEN",

        ingredients: product?.ingredients || "",

        available: product?.available ?? true,

        nutrition: product?.nutrition || {
            portion: {
            amount: "",
            unit: "g"
            },

            values: {
            energy: {
                per100g: "",
                perPortion: "",
                dailyValue: ""
            },

            carbohydrates: {
                per100g: "",
                perPortion: "",
                dailyValue: ""
            },

            totalSugars: {
                per100g: "",
                perPortion: "",
                dailyValue: ""
            },

            addedSugars: {
                per100g: "",
                perPortion: "",
                dailyValue: ""
            },

            proteins: {
                per100g: "",
                perPortion: "",
                dailyValue: ""
            },

            totalFat: {
                per100g: "",
                perPortion: "",
                dailyValue: ""
            },

            saturatedFat: {
                per100g: "",
                perPortion: "",
                dailyValue: ""
            },

            transFat: {
                per100g: "",
                perPortion: "",
                dailyValue: ""
            },

            fiber: {
                per100g: "",
                perPortion: "",
                dailyValue: ""
            },

            sodium: {
                per100g: "",
                perPortion: "",
                dailyValue: ""
            }
            }
        }
    }));
    function convertNumber(value) {
        if (value === "" || value === null || value === undefined) {
            return null;
        }

        return Number(
            String(value).replace(",", ".")
        );
    }
    function compressImage(file, maxWidth = 1200, quality = 0.8) {
        return new Promise((resolve, reject) => {
            const img = new Image();

            img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > maxWidth) {
                height = (height * maxWidth) / width;
                width = maxWidth;
            }

            const canvas = document.createElement("canvas");

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext("2d");

            ctx.drawImage(
                img,
                0,
                0,
                width,
                height
            );

            canvas.toBlob(
                (blob) => {
                if (!blob) {
                    reject(
                    new Error("Erro ao comprimir imagem")
                    );
                    return;
                }

                const compressedFile = new File(
                    [blob],
                    file.name,
                    {
                    type: "image/webp"
                    }
                );

                resolve(compressedFile);
                },
                "image/webp",
                quality
            );
            };

            img.onerror = () => {
            reject(
                new Error("Erro ao carregar imagem")
            );
            };

            img.src = URL.createObjectURL(file);
        });
    }
    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value
        }));
    }
    function handlePriceChange(e) {
        const { name, value } = e.target;

        if (/^\d*(,\d{0,2})?$/.test(value)) {
            setForm((current) => ({
            ...current,
            [name]: value
            }));
        }
    }
    function handleSaleChange(e) {
        const { name, value } = e.target;

        if (
            name === "promotionalPrice" &&
            !/^\d*(,\d{0,2})?$/.test(value)
        ) {
            return;
        }

        if (
            name === "quantity" &&
            !/^\d*$/.test(value)
        ) {
            return;
        }

        setForm((current) => ({
            ...current,
            sale: {
            ...current.sale,
            [name]: value
            }
        }));
        }
    async function handleImageChange(e) {
        const file = e.target.files[0];

        if (!file) {
            return;
        }

        try {
            console.log(
            "Original:",
            file.size / 1024 / 1024,
            "MB"
            );

            const compressedFile = await compressImage(
            file,
            1200,
            0.8
            );

            console.log(
            "Comprimida:",
            compressedFile.size / 1024 / 1024,
            "MB"
            );

            setForm((current) => ({
            ...current,
            image: compressedFile
            }));

            setImagePreview(
            URL.createObjectURL(compressedFile)
            );

        } catch (error) {
            console.error(error);
        }
        }
    function handleAllergenChange(e) {
        const { value, checked } = e.target;

        setForm((current) => ({
            ...current,

            allergy: checked
            ? [...current.allergy, value]
            : current.allergy.filter(
                (allergen) => allergen !== value
                )
        }));
    }
    function handlePortionChange(e) {
        const { name, value } = e.target;

        setForm((current) => ({
            ...current,

            nutrition: {
            ...current.nutrition,

            portion: {
                ...current.nutrition.portion,
                [name]: value
            }
            }
        }));
    }
    function handleNutritionChange(e, nutrient) {
        const { name, value } = e.target;

        // Permite números, uma vírgula e até 2 casas decimais
        if (!/^\d*(,\d{0,2})?$/.test(value)) {
            return;
        }

        setForm((current) => ({
            ...current,
            nutrition: {
            ...current.nutrition,
            values: {
                ...current.nutrition.values,
                [nutrient]: {
                ...current.nutrition.values[nutrient],
                [name]: value
                }   
            }
            }
        }));
    }
    function handleSubmit(e) {
        e.preventDefault();

        const productData = new FormData();

        const nutrition = {
            ...form.nutrition,

            portion: {
            ...form.nutrition.portion,

            amount: convertNumber(
                form.nutrition.portion.amount
            )
            },

            values: Object.fromEntries(
            Object.entries(form.nutrition.values).map(
                ([nutrient, values]) => [
                nutrient,
                {
                    per100g: convertNumber(
                    values.per100g
                    ),

                    perPortion: convertNumber(
                    values.perPortion
                    ),

                    dailyValue: convertNumber(
                    values.dailyValue
                    )
                }
                ]
            )
            )
        };

        productData.append("name", form.name);
        productData.append("category", form.category);

        productData.append(
            "price",
            String(form.price).replace(",", ".")
        );

        const sale = {
            promotionalPrice: convertNumber(
            form.sale.promotionalPrice
            ),

            quantity: Number(form.sale.quantity)
        };

        productData.append(
            "sale",
            JSON.stringify(sale)
        );


        productData.append(
            "description",
            form.description
        );

        productData.append(
            "available",
            String(form.available)
        );

        productData.append(
            "ingredients",
            form.ingredients
        );

        productData.append(
            "allergy",
            JSON.stringify(form.allergy)
        );

        productData.append(
            "gluten",
            form.gluten
        );

        productData.append(
            "nutrition",
            JSON.stringify(nutrition)
        );

        if (form.image) {
            productData.append(
            "image",
            form.image
            );
        }
        if(type === 'edit'){
            return handleCreateProduct(product._id, productData);
        } else{
            return handleCreateProduct(productData);
        }
        
    }
    return(
        <>
            <form className="addproduct__form" onSubmit={handleSubmit}>
                <h3 className="addproduct__title">Informações do Produto</h3>
                <div className="addproduct__grid">
                    <div className="addproduct__container">
                        <p className="addproduct__label">Nome</p>
                        <input type="text" className="addproduct__input" value={form.name} name="name" onChange={handleChange} required></input>
                    </div>
                    <div className="addproduct__container">
                        <p className="addproduct__label">Categoria</p>
                        <select id="category" name="category" className="addproduct__input" value={currentCategory} onChange={(e) => {handleChange(e); setCurrentCategory(e.target.value)}} placeholder="Escolha uma Categoria" >
                                <option></option>
                            {categoryList.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        {currentCategory === "Nova Categoria" &&<input type="text" className="addproduct__input" value={form.category} name="category" onChange={handleChange} placeholder="Insira uma nova categoria" required></input>}
                    </div>
                    <div className="addproduct__container">
                        <p className="addproduct__label">Preço</p>
                        <input type="text" inputMode="decimal" name="price" value={form.price} onChange={handlePriceChange} placeholder="0,00" className="addproduct__input" required></input>
                    </div>
                    <div className="addproduct__container">
                        <p className="addproduct__label">Preço Promocional</p>
                        <input type="text" inputMode="decimal" name="promotionalPrice" value={form.sale.promotionalPrice} onChange={handleSaleChange} placeholder="0,00" className="addproduct__input"></input>
                        <p className="addproduct__label">Quantidade Mínima para Promoção</p>
                        <input type="text" inputMode="decimal" name="quantity" value={form.sale.quantity} onChange={handleSaleChange} placeholder="0" className="addproduct__input"></input>
                    </div>
                </div>
                <div className="addproduct__container addproduct__container--image">
                    <p className="addproduct__label">Foto do Produto</p>
                    {imagePreview && <div className="addproduct__image-preview-container">
                        <img src={imagePreview} className="addproduct__image-preview"></img>
                    </div>}
                    <input type="file" accept="image/*" className="addproduct__input" name="image" onChange={handleImageChange}></input>
                </div>
                <div className="addproduct__container">
                    <p className="addproduct__label">Descrição</p>
                    <textarea type="text" className="addproduct__textarea" value={form.description} name="description" onChange={handleChange} required></textarea>
                </div>
                <h3 className="addproduct__title">Informações Adicionais</h3>
                <div className="addproduct__container">
                    <p className="addproduct__label">Alergias</p>
                    <div className="addproduct__checkbox-container">
                        {allergenOptions.map((allergen) =>(
                            <label className="addproduct__checkbox-label" key={allergen}>
                                <input className="addproduct__checkbox-input" type="checkbox" value={allergen} checked={form.allergy.includes(allergen)} onChange={handleAllergenChange} />
                                {allergen}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="addproduct__container">
                    <label
                        className="addproduct__label"
                        htmlFor="gluten"
                    >
                        Glúten
                    </label>

                    <select
                        id="gluten"
                        name="gluten"
                        value={form.gluten}
                        onChange={handleChange}
                        className="addproduct__input"
                    >
                        <option value="">Selecione</option>
                        <option value="CONTÉM GLÚTEN">Contém glúten</option>
                        <option value="NÃO CONTÉM GLÚTEN">Não contém glúten</option>
                        <option value="PODE CONTER GLÚTEN">Pode conter glúten</option>
                </select>
                </div>
                <div className="addproduct__container addproduct__container--ingredients">
                    <p className="addproduct__label">Ingredientes</p>
                    <textarea type="text" className="addproduct__textarea" value={form.ingredients} name="ingredients" onChange={handleChange} required></textarea>
                </div>
                <h3 className="addproduct__title">Informações Nutricionais</h3>
                <div className="addproduct__container addproduct__container--portions">
                    <p className="addproduct__label">Porção</p>
                    <input className="addproduct__input" type="number" name="amount" value={form.nutrition.portion.amount} onChange={handlePortionChange} placeholder="0" required/>
                    <select name="unit" value={form.nutrition.portion.unit} onChange={handlePortionChange}>
                        <option value="g">g</option>
                        <option value="ml">ml</option>
                        <option value="unidade">unidade</option>
                    </select>
                </div>
                {form.nutrition.portion.amount !== '' && <div className="addproduct__container">
                    <p className="addproduct__label">Valores Nutricionais</p>
                    <table className="addproduct__table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>100g</th>
                                <th>{form.nutrition.portion.amount}{form.nutrition.portion.unit}</th>
                                <th>%VD</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="addproduct__table-firstcollumn">Valor Energético</td>
                                <td><input inputMode="decimal" type="text" name="per100g" value={form.nutrition.values.energy.per100g} onChange={(e) => handleNutritionChange(e, 'energy')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="perPortion" value={form.nutrition.values.energy.perPortion} onChange={(e) => handleNutritionChange(e, 'energy')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="dailyValue" value={form.nutrition.values.energy.dailyValue} onChange={(e) => handleNutritionChange(e, 'energy')} ></input></td>
                            </tr>
                            <tr>
                                <td className="addproduct__table-firstcollumn">Carboidratos</td>
                                <td><input inputMode="decimal" type="text" name="per100g" value={form.nutrition.values.carbohydrates.per100g} onChange={(e) => handleNutritionChange(e, 'carbohydrates')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="perPortion" value={form.nutrition.values.carbohydrates.perPortion} onChange={(e) => handleNutritionChange(e, 'carbohydrates')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="dailyValue" value={form.nutrition.values.carbohydrates.dailyValue} onChange={(e) => handleNutritionChange(e, 'carbohydrates')} ></input></td>
                            </tr>
                            <tr>
                                <td className="addproduct__table-firstcollumn">Açúcares Totais</td>
                                <td><input inputMode="decimal" type="text" name="per100g" value={form.nutrition.values.totalSugars.per100g} onChange={(e) => handleNutritionChange(e, 'totalSugars')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="perPortion" value={form.nutrition.values.totalSugars.perPortion} onChange={(e) => handleNutritionChange(e, 'totalSugars')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="dailyValue" value={form.nutrition.values.totalSugars.dailyValue} onChange={(e) => handleNutritionChange(e, 'totalSugars')} ></input></td>
                            </tr>
                            <tr>
                                <td className="addproduct__table-firstcollumn">Açúcares adicionais</td>
                                <td><input inputMode="decimal" type="text" name="per100g" value={form.nutrition.values.addedSugars.per100g} onChange={(e) => handleNutritionChange(e, 'addedSugars')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="perPortion" value={form.nutrition.values.addedSugars.perPortion} onChange={(e) => handleNutritionChange(e, 'addedSugars')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="dailyValue" value={form.nutrition.values.addedSugars.dailyValue} onChange={(e) => handleNutritionChange(e, 'addedSugars')} ></input></td>
                            </tr>
                            <tr>
                                <td className="addproduct__table-firstcollumn">Proteinas</td>
                                <td><input inputMode="decimal" type="text" name="per100g" value={form.nutrition.values.proteins.per100g} onChange={(e) => handleNutritionChange(e, 'proteins')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="perPortion" value={form.nutrition.values.proteins.perPortion} onChange={(e) => handleNutritionChange(e, 'proteins')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="dailyValue" value={form.nutrition.values.proteins.dailyValue} onChange={(e) => handleNutritionChange(e, 'proteins')} ></input></td>
                            </tr>
                            <tr>
                                <td className="addproduct__table-firstcollumn">Gorduras Totais</td>
                                <td><input inputMode="decimal" type="text" name="per100g" value={form.nutrition.values.totalFat.per100g} onChange={(e) => handleNutritionChange(e, 'totalFat')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="perPortion" value={form.nutrition.values.totalFat.perPortion} onChange={(e) => handleNutritionChange(e, 'totalFat')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="dailyValue" value={form.nutrition.values.totalFat.dailyValue} onChange={(e) => handleNutritionChange(e, 'totalFat')} ></input></td>
                            </tr>
                            <tr>
                                <td className="addproduct__table-firstcollumn">Gorduras saturadas</td>
                                <td><input inputMode="decimal" type="text" name="per100g" value={form.nutrition.values.saturatedFat.per100g} onChange={(e) => handleNutritionChange(e, 'saturatedFat')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="perPortion" value={form.nutrition.values.saturatedFat.perPortion} onChange={(e) => handleNutritionChange(e, 'saturatedFat')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="dailyValue" value={form.nutrition.values.saturatedFat.dailyValue} onChange={(e) => handleNutritionChange(e, 'saturatedFat')} ></input></td>
                            </tr>
                            <tr>
                                <td className="addproduct__table-firstcollumn">Gorduras trans</td>
                                <td><input inputMode="decimal" type="text" name="per100g" value={form.nutrition.values.transFat.per100g} onChange={(e) => handleNutritionChange(e, 'transFat')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="perPortion" value={form.nutrition.values.transFat.perPortion} onChange={(e) => handleNutritionChange(e, 'transFat')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="dailyValue" value={form.nutrition.values.transFat.dailyValue} onChange={(e) => handleNutritionChange(e, 'transFat')} ></input></td>
                            </tr>
                            <tr>
                                <td className="addproduct__table-firstcollumn">Fibra alimentar</td>
                                <td><input inputMode="decimal" type="text" name="per100g" value={form.nutrition.values.fiber.per100g} onChange={(e) => handleNutritionChange(e, 'fiber')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="perPortion" value={form.nutrition.values.fiber.perPortion} onChange={(e) => handleNutritionChange(e, 'fiber')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="dailyValue" value={form.nutrition.values.fiber.dailyValue} onChange={(e) => handleNutritionChange(e, 'fiber')} ></input></td>
                            </tr>
                            <tr>
                                <td className="addproduct__table-firstcollumn">Sódio</td>
                                <td><input inputMode="decimal" type="text" name="per100g" value={form.nutrition.values.sodium.per100g} onChange={(e) => handleNutritionChange(e, 'sodium')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="perPortion" value={form.nutrition.values.sodium.perPortion} onChange={(e) => handleNutritionChange(e, 'sodium')} ></input></td>
                                <td><input inputMode="decimal" type="text" name="dailyValue" value={form.nutrition.values.sodium.dailyValue} onChange={(e) => handleNutritionChange(e, 'sodium')} ></input></td>
                            </tr>
                        </tbody>
                    </table>
                </div>}
                <div className="addproduct__container addproduct__container--available">
                    <input type="checkbox" name="available" checked={form.available} onChange={handleChange}/><p>Produto Disponível</p>
                </div>
                <button type="submit" className="addproduct__submit">{type === 'edit' ? 'Salvar Produto' : "Criar Produto"}</button>
            </form>
        </>
    )
}