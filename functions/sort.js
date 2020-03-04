export default function Sort(Property, low, high)
{
    if(low < high)
    {
        //console.log("Running Sort");
        var partitionIndex = Partition(Property, low, high);

        Sort(Property, low, partitionIndex - 1);
        Sort(Property, partitionIndex + 1, high);
    }

    return Property;
}

export function Partition(Property, low, high)
{
    //console.log("Partitioning List");
    var pivot = high;

    var lowIndex = (low - 1);

    for(let j = low; j < high; j++)
    {
        if(Property[j].price <= Property[pivot].price)
        {
            lowIndex++;

            var temp = Property[lowIndex];

            Property[lowIndex] = Property[j];
            Property[j] = temp;
        }
    }

    var temp1 = Property[lowIndex + 1];
    Property[lowIndex + 1] = Property[high];
    Property[high] = temp1;

    return lowIndex + 1;
}